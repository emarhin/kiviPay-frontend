"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import ThunderAnimation from "@/components/animation/thundar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronsUpDown, Check, CreditCard } from "lucide-react";

/* ---------------- ADDRESS VALIDATION ---------------- */

const isAddress = (address: string) => /^0x[a-fA-F0-9]{40}$/.test(address);

/* ---------------- TOKENS (ALL MERGED) ---------------- */

const TOKENS = [
  {
    id: "eth",
    symbol: "ETH",
    balance: 2.48,
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    id: "usdt",
    symbol: "USDT",
    balance: 1200,
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  {
    id: "usdc",
    symbol: "USDC",
    balance: 850,
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
];

/* ---------------- WALLETS ---------------- */

const WALLETS = [
  {
    id: "1",
    name: "Main Wallet",
    address: "0xA12...9F3",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=mainwallet",
  },
  {
    id: "2",
    name: "Trading Wallet",
    address: "0xB45...8D2",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=tradingwallet",
  },
];

export default function ThundarWallet() {
  const [tab, setTab] = useState<"send" | "buy">("send");
  const [selectedWallet, setSelectedWallet] = useState(WALLETS[0]);
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);

  const [openWalletSearch, setOpenWalletSearch] = useState(false);
  const [openTokenSearch, setOpenTokenSearch] = useState(false);

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState("");

  const isValidAddr = isAddress(recipient);
  const isValidAmount =
    parseFloat(amount) > 0 && parseFloat(amount) <= selectedToken.balance;

  const canSend = isValidAddr && isValidAmount;

  const total = useMemo(() => {
    return parseFloat(amount || "0");
  }, [amount]);

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <ThunderAnimation size={100} animated speed={1} />

        {/* Wallet Selector */}
        <Popover open={openWalletSearch} onOpenChange={setOpenWalletSearch}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-between rounded-full"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedWallet.avatar} />
                  <AvatarFallback>
                    {selectedWallet.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {selectedWallet.address}
              </div>
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[240px] p-0">
            <Command>
              <CommandInput placeholder="Search wallet..." />
              <CommandEmpty>No wallet found.</CommandEmpty>
              <CommandGroup>
                {WALLETS.map((wallet) => (
                  <CommandItem
                    key={wallet.id}
                    onSelect={() => {
                      setSelectedWallet(wallet);
                      setOpenWalletSearch(false);
                    }}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={wallet.avatar} />
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{wallet.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {wallet.address}
                        </p>
                      </div>
                      {selectedWallet.id === wallet.id && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Card */}
      <Card className="max-w-md mx-auto shadow-lg rounded-2xl">
        <CardHeader className="space-y-4">
          {/* Tabs */}
          <div className="flex bg-muted rounded-full p-1">
            <button
              onClick={() => setTab("send")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                tab === "send"
                  ? "bg-[#FDC700] text-[#733E0B]"
                  : "text-muted-foreground"
              }`}
            >
              Send
            </button>

            <button
              onClick={() => setTab("buy")}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
                tab === "buy"
                  ? "bg-[#FDC700] text-[#733E0B]"
                  : "text-muted-foreground"
              }`}
            >
              Buy
            </button>
          </div>

          <CardTitle className="text-center">
            {tab === "send" ? "Send Crypto" : "Buy Crypto"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Token Selector */}
          <div>
            <label className="text-sm font-medium block mb-2">Token</label>

            <Popover open={openTokenSearch} onOpenChange={setOpenTokenSearch}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={selectedToken.logo}
                      alt=""
                      width={20}
                      height={20}
                    />
                    {selectedToken.symbol}
                  </div>
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search token..." />
                  <CommandGroup>
                    {TOKENS.map((token) => (
                      <CommandItem
                        key={token.id}
                        onSelect={() => {
                          setSelectedToken(token);
                          setOpenTokenSearch(false);
                        }}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Image
                            src={token.logo}
                            alt=""
                            width={20}
                            height={20}
                          />
                          {token.symbol}
                          <span className="ml-auto text-xs text-muted-foreground">
                            {token.balance}
                          </span>
                          {selectedToken.id === token.id && (
                            <Check className="h-4 w-4 ml-2" />
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {tab === "send" && (
              <div className="text-xs text-muted-foreground mt-2">
                Balance: {selectedToken.balance} {selectedToken.symbol}
              </div>
            )}
          </div>

          {/* SEND MODE */}
          {tab === "send" && (
            <>
              <Input
                placeholder="Recipient Address (0x...)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className={recipient && !isValidAddr ? "border-red-500" : ""}
              />

              <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Button
                disabled={!canSend}
                className="w-full bg-[#FDC700] hover:bg-[#FDC700]/80 text-[#733E0B]"
              >
                Send {selectedToken.symbol}
              </Button>
            </>
          )}

          {/* BUY MODE */}
          {tab === "buy" && (
            <>
              <Input
                type="number"
                placeholder="Amount in USD"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
              />

              <Button
                disabled={!usdAmount || parseFloat(usdAmount) <= 0}
                className="w-full bg-[#FDC700] hover:bg-[#FDC700]/80 text-[#733E0B] flex items-center justify-center gap-2"
              >
                <CreditCard size={18} />
                Buy {selectedToken.symbol}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
