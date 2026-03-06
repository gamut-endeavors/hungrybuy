'use client';

import { useState } from 'react';
import QRScannerModal from '@/components/auth/QRScannerModal';
import { Search, QrCode, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
  onSearchOpen?: () => void;
  scrollProgress?: number;
}

export default function Header({
  cartCount = 0,
  onCartClick,
  onSearchOpen,
  scrollProgress = 0
}: HeaderProps) {

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

  const headerHeight = 116 - (56 * scrollProgress);
  const searchTop = 68 - (60 * scrollProgress);
  const searchShrinkX = 110 * scrollProgress;
  const isScrolled = scrollProgress > 0.5;

  const titleOpacity = (isTransitioning && !isScrolled) ? 0 : 1 - (scrollProgress * 1.5);
  const titleTranslateY = (isTransitioning && !isScrolled) ? -16 : -16 * scrollProgress;
  const titleScale = 1 - (0.05 * scrollProgress);

  let searchTransform = 'translate(0px, 0px) scaleX(1)';
  let searchWidth = `calc(100% - ${searchShrinkX}px)`;
  let searchOpacity = 1;

  if (isTransitioning) {
    if (!isScrolled) {
      searchTransform = 'translate(44px, -64px) scaleX(1)';
      searchWidth = 'calc(100% - 2.75rem)';
    } else {
      searchTransform = 'translate(0px, 0px) scaleX(1.1)';
      searchOpacity = 0;
    }
  }

  const activeTransition = isTransitioning ? 'all 0.3s ease-out' : 'none';

  return (
    <>
      <div
        style={{ height: `${headerHeight}px` }}
        className="relative w-full overflow-visible"
      >

        {/* Title Section */}
        <div
          style={{
            opacity: Math.max(0, titleOpacity),
            transform: `translateY(${titleTranslateY}px) scale(${titleScale})`,
            pointerEvents: isScrolled ? 'none' : 'auto',
            transition: activeTransition,
            visibility: titleOpacity <= 0 ? 'hidden' : 'visible'
          }}
          className="absolute top-2 left-0 flex flex-col origin-top"
        >
          <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-1">
            HungryBuy<span className="text-brand-orange">.</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">Delicious food at your table</p>
        </div>

        {/* Action Buttons (QR, Cart) */}
        <div className="absolute top-2 right-0 flex items-center gap-4 z-20">
          <button
            onClick={() => setIsScannerOpen(true)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${tableToken
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

        {/* Search Bar */}
        <div
          onClick={handleSearchClick}
          style={{
            top: `${searchTop}px`,
            width: searchWidth,
            transform: searchTransform,
            opacity: searchOpacity,
            transition: activeTransition,
            visibility: searchOpacity <= 0 ? 'hidden' : 'visible'
          }}
          className="absolute left-0 z-10 cursor-pointer group origin-left"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-orange transition-colors" size={18} />
          <div className="w-full h-10 bg-gray-50 rounded-xl flex truncate items-center pl-10 pr-4 text-base text-gray-400 border border-transparent group-hover:border-brand-orange transition-colors font-medium">
            <div style={{ fontSize: `${16 - (2 * scrollProgress)}px` }}>
              Search for dishes, drinks...
            </div>
          </div>
        </div>

      </div>

      <QRScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} onScan={handleScan} />
    </>
  );
}