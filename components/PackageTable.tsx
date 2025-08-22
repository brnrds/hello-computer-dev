type PackageTier = { Price: string; Includes: string };
type Props = { packages: Record<string, PackageTier> };

export default function PackageTable({ packages }: Props) {
  const tiers = Object.entries(packages || {});
  if (!tiers.length) return null;

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-3 py-2 text-left font-semibold">Package</th>
            <th className="px-3 py-2 text-left font-semibold">Price</th>
            <th className="px-3 py-2 text-left font-semibold">Includes</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map(([name, tier]) => (
            <tr key={name} className="border-t">
              <td className="px-3 py-2 font-medium">{name}</td>
              <td className="px-3 py-2">{tier.Price}</td>
              <td className="px-3 py-2">{tier.Includes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
