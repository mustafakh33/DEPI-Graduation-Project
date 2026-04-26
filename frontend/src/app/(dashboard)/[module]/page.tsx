import { ModulePage } from "@/features/modules/module-page";
import { moduleConfigs } from "@/features/modules/config";
import { notFound } from "next/navigation";

export default function ModuleRoutePage({ params }: { params: { module: string } }) {
  if (!(params.module in moduleConfigs)) {
    notFound();
  }

  return <ModulePage moduleKey={params.module as keyof typeof moduleConfigs} />;
}
