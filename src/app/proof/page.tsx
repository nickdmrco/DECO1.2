import { LogoHorizontal, LogoStacked, Mark } from "@/components/brand/Logo";

export default function Proof() {
  return (
    <div className="bg-white p-10 pt-40">
      <div id="cal-h" className="inline-block">
        <LogoHorizontal size={56.12} />
      </div>
      <div className="mt-16 flex items-end gap-20">
        <div id="cal-s" className="inline-block">
          <LogoStacked size={34.08} />
        </div>
        <Mark style={{ width: 110, height: 110 }} />
      </div>
      <div className="mt-16 bg-navy p-10">
        <LogoHorizontal size={30} tone="reversed" />
      </div>
      <div className="mt-6 bg-blue p-10">
        <LogoHorizontal size={30} tone="white" />
      </div>
      <div className="mt-6">
        <LogoHorizontal size={22} />
      </div>
    </div>
  );
}
