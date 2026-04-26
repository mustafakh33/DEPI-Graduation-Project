import { ModuleDetail } from "@/features/modules/module-detail";
import { moduleConfigs } from "@/features/modules/config";
import { notFound } from "next/navigation";

export default function ModuleDetailPage({ params }: { params: { module: string; id: string } }) {
  if (!(params.module in moduleConfigs)) {
    notFound();
  }

  return <ModuleDetail moduleKey={params.module as keyof typeof moduleConfigs} id={params.id} />;
}
