import Image from 'next/image';

interface Props {
  id?: string;
  name: string;
  image: string;
  isActive: boolean;
  onClick: () => void;
}

export default function CategoryItem({ name, image, isActive, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center gap-2 group cursor-pointer w-full shrink-0"
    >
      <div 
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
        className={`
          relative w-14 h-14 rounded-full overflow-hidden flex items-center justify-center transition-all border-2
          ${isActive 
            ? 'bg-brand-red/10 border-brand-red/20 shadow-sm scale-105' 
            : 'bg-brand-bg border-transparent hover:border-brand-red/10' 
          }
      `}>
         {(!image || image === "") && (
           <div className={`relative z-10 text-[9px] leading-tight font-bold text-center px-1 line-clamp-2 wrap-break-word ${isActive ? 'text-brand-red' : 'text-brand-dark/40'}`}>
             {name}
           </div>
         )}
         
         {image && (
          <Image 
            src={image} 
            alt={name} 
            fill 
            className={`object-contain p-2.5 transition-opacity ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} 
          />
         )}
      </div>
      
      {/* <span className={`text-[11px] font-medium transition-colors text-center ${isActive ? 'text-brand-red font-bold' : 'text-brand-dark/60 group-hover:text-brand-dark'}`}>
        {name}
      </span> */}
    </div>
  );
}