
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Loader2, Building } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useStock } from '@/hooks/use-stock';
import { useDebounce } from '@/hooks/use-debounce';

interface SearchResult {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export default function StockSearch() {
  const [open, setOpen] = useState(false);
  const { setSelectedStock } = useStock();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <div
        className="relative flex-1 cursor-pointer items-center md:grow-0"
        onClick={() => setOpen(true)}
      >
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <div className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px] h-9 flex items-center">
            <span className="text-sm text-muted-foreground">Search stocks...</span>
        </div>
        <kbd className="pointer-events-none absolute right-2.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <SearchContent runCommand={runCommand} />
      </CommandDialog>
    </>
  );
}

function SearchContent({ runCommand }: { runCommand: (command: () => unknown) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { setSelectedStock } = useStock();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const searchStocks = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/stock/search?q=${debouncedQuery}`);
          if (response.ok) {
            const data = await response.json();
            setResults(data);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error("Search failed:", error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
      searchStocks();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <Command shouldFilter={false}>
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search for a stock (e.g. TCS.NS)..."
      />
      <CommandList>
        {loading && (
          <div className="p-4 flex justify-center items-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        {!loading && debouncedQuery.length > 1 && results.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {results.length > 0 && (
          <CommandGroup heading="Stocks">
            {results.map((item) => (
              <CommandItem
                key={item.symbol}
                value={item.symbol}
                onSelect={() => {
                  runCommand(() => setSelectedStock(item.symbol));
                }}
              >
                <Building className="mr-2" />
                <div className="flex flex-col">
                  <span className="font-semibold">{item.symbol}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}
