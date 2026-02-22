interface Props {
  categoryName: string;
  categorydescription?: string;
}

export default function SectionTitle({
  categoryName,
  categorydescription,
}: Props) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
        {categoryName}
      </h2>
      <p className="text-[12px] md:text-sm text-gray-500 mt-1">
        {categorydescription || "Freshly made with premium ingredients"}
      </p>
    </div>
  );
}