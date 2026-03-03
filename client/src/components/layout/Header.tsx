'use client';

import { useState } from 'react';
import QRScannerModal from '@/components/auth/QRScannerModal';
import { Search, QrCode, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
  onSearchOpen?: () => void;
  isScrolled?: boolean;
}

export default function Header({ cartCount = 0, onCartClick, onSearchOpen, isScrolled }: HeaderProps) {

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { tableToken, tableNo, resolveTableFromToken } = useCart();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSearchClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (onSearchOpen) onSearchOpen();

      setIsTransitioning(false);
    }, 50);
  };

  const handleScan = async (scannedUrl: string) => {
    try {
      let qrToken = '';

      if (scannedUrl.startsWith('http')) {
        const urlObj = new URL(scannedUrl);
        qrToken = urlObj.searchParams.get('table') || '';
      } else {
        qrToken = scannedUrl;
      }

      console.log(qrToken);

      if (qrToken) {
        setIsScannerOpen(false);

        await resolveTableFromToken(qrToken);

      } else {
        alert("Invalid QR Code. Please scan a valid table code.");
      }
    } catch (e) {
      console.error("Invalid scan", e);
      setIsScannerOpen(false);
    }
  };

  return (
    <>
      <div className={`relative w-full transition-all duration-300 ease-in-out ${isScrolled ? 'h-15' : 'h-29'}`}>

        <div
          className={`absolute top-2 left-0 flex flex-col transition-all duration-300 origin-top
            ${isScrolled
              ? 'opacity-0 invisible -translate-y-4 pointer-events-none scale-95'
              : 'opacity-100 visible translate-y-0 scale-100'
            }
            ${isTransitioning && !isScrolled
              ? 'opacity-0 invisible -translate-y-4 pointer-events-none'
              : ''
            }
          `}
        >
          <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
            HungryBuy<span className="text-brand-orange">.</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">Delicious food at your table</p>
        </div>

        <div className="absolute top-2 right-0 flex items-center gap-4 z-20">
          <button
            onClick={() => setIsScannerOpen(true)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${tableToken
              ? 'bg-[#f16716] text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
              }`}
          >
            {tableToken ? <span className="text-sm font-bold">{tableNo}</span> : <QrCode size={18} />}
          </button>

          <button onClick={onCartClick} className="relative p-1 shrink-0 active:scale-95 transition-transform">
            <ShoppingCart size={26} className="text-gray-800" strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div
          onClick={handleSearchClick}
          className={`absolute left-0 transition-all duration-300 ease-out z-10 cursor-pointer group origin-left
            ${isScrolled
              ? 'top-2 w-[calc(100%-110px)]'
              : 'top-17 w-full'
            }
            ${isTransitioning && !isScrolled
              ? '-translate-y-16 translate-x-11 w-[calc(100%-2.75rem)] opacity-100 visible'
              : isTransitioning && isScrolled
                ? 'translate-y-0 translate-x-0 opacity-0 invisible scale-x-110'
                : 'translate-y-0 translate-x-0 opacity-100 visible scale-x-100'
            }
          `}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-orange transition-colors" size={18} />
          <div className="w-full h-10 bg-gray-50 rounded-xl flex truncate items-center pl-10 pr-4 text-base text-gray-400 border border-transparent group-hover:border-brand-orange transition-all font-medium">
            {isScrolled ?
              <div className='text-[14px]'>Search for dishes, drinks...</div> :
              <div>Search for dishes, drinks...</div>
            }
          </div>
        </div>

      </div>

      <QRScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} onScan={handleScan} />
    </>
  );
}