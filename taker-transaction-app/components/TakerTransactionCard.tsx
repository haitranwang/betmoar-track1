"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent } from "./card";
import { Button } from "./button";

// Define Polygon RPC endpoint
const POLYGON_RPC = "https://polygon-rpc.com/";

export default function TakerTransactionCard() {
  const [txHash, setTxHash] = useState("");
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTransaction(hash: string) {
    if (!hash) return;
    setLoading(true);
    setError("");

    try {
      const provider = new ethers.JsonRpcProvider(POLYGON_RPC);
      const tx = await provider.getTransaction(hash);

      if (!tx) {
        setError("Transaction not found");
      } else {
        setTransaction(tx);
      }
    } catch (err) {
      setError("Failed to fetch transaction");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <Card className="p-4 sm:p-6 bg-gray-800 border border-gray-700 shadow-xl w-full max-w-lg">
        <CardContent>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">Taker Transaction Details</h2>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Enter transaction hash..."
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            className="w-full p-2 mb-3 text-black rounded border border-gray-600 text-sm sm:text-base"
          />
          <Button
            onClick={() => fetchTransaction(txHash)}
            className="w-full bg-purple-500 hover:bg-purple-700 text-white text-sm sm:text-base"
          >
            Search Transaction
          </Button>

          {/* Loading State */}
          {loading && <p className="text-gray-400 mt-3 text-sm sm:text-base">Fetching transaction...</p>}

          {/* Error Message */}
          {error && <p className="text-red-400 mt-3 text-sm sm:text-base">{error}</p>}

          {/* Transaction Details */}
          {transaction && (
            <div className="mt-5 text-gray-700 text-sm sm:text-base">
              <div className="break-words">
                <p><strong>Wallet:</strong> {transaction.from}</p>
                <p><strong>To:</strong> {transaction.to}</p>
                <p><strong>Value:</strong> {ethers.formatEther(transaction.value)} MATIC</p>
                <p><strong>Gas Fee:</strong> {ethers.formatUnits(transaction.gasPrice, "gwei")} Gwei</p>
              </div>

              <Button
                onClick={() => window.open(`https://polygonscan.com/tx/${txHash}`, "_blank")}
                className="mt-4 bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-sm sm:text-base"
              >
                View on Polygonscan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
