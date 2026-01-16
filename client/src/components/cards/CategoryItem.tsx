import Image from 'next/image';

interface Props {
  name: string;
  image: string;
}

export default function CategoryItem({ name, image }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 rounded-full bg-red-100 overflow-hidden border-2 border-transparent hover:border-brand-red transition-all">
        {/* Placeholder for Next/Image - replace src with actual prop */}
        <div className="bg-brand-red w-full h-full flex items-center justify-center text-white">
           {/* In real app use <Image /> here */}
           <Image  src={image} fill alt='Img'></Image>
        </div>
      </div>
      <span className="font-medium text-brand-dark">{name}</span>
    </div>
  );
}