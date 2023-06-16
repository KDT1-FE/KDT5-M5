export default function SectionTitle({
  text = '모든 상품',
}: {
  text?: string;
}) {
  return <div className="pb-3 text-3xl font-bold">{text}</div>;
}
