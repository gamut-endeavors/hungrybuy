'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchHeader from '@/components/search/SearchHeader';
import SearchResultCard from '@/components/search/SearchResultCard';
import { MenuItem } from '@/lib/types';

interface SearchOverlayProps {
    onClose: () => void;
    products: MenuItem[];
    isScrolled?: boolean;
}

export default function SearchOverlay({ onClose, products, isScrolled }: SearchOverlayProps) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setPageLoaded(true), 50);
        return () => clearTimeout(timer);
    }, []);



    const handleResultClick = (categoryId: string, productId: string) => {
        onClose();
        router.replace(`/?categoryId=${categoryId}&highlight=${productId}`);
    };

    const q = query.toLowerCase();
    let results: MenuItem[] = [];

    if (query.trim().length >= 1) {
        results = products.filter((p) =>
            p.name.toLowerCase().includes(q) ||
            (p.description && p.description.toLowerCase().includes(q))
        );
    }

    return (
        <div className={`fixed inset-0 z-50 bg-gray-50 flex flex-col animate-in fade-in duration-200
            ${isScrolled ? 'slide-in-from-left-8 origin-top-left' : 'slide-in-from-bottom-2'} 
        `}>
            <SearchHeader query={query} setQuery={setQuery} onBack={onClose} isScrolled={isScrolled} />

            <div className={`flex-1 overflow-y-auto px-4 pt-4 pb-20 transition-opacity duration-300 ease-in-out
               ${pageLoaded ? 'opacity-100' : 'opacity-0'}
            `}>
                {query.trim().length >= 1 && (
                    <p className="text-sm text-gray-500 mb-4 font-medium px-1">
                        Found {results.length} results
                    </p>
                )}

                <div className="flex flex-col">
                    {results.map((product) => (
                        <SearchResultCard
                            key={product.id}
                            product={product}
                            onClick={handleResultClick}
                        />
                    ))}
                </div>

                {results.length > 0 && (
                    <p className="text-center text-xs text-gray-400 mt-6 pb-6">End of results</p>
                )}
            </div>
        </div>
    );
}