import { Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const avatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbsUAr3UOn8sJwnO2Uu2G3g4hrIbfLQu2ue2gmp7waurhbS6qXl21rWBA3inlXPdOQX217Jmii9zAUjeSpf6c4gbXuH44LnWkDobLi9-RV95utmjSFW9LwRxodynuucjZw05hWfZvwrWpsCt2cJCuoL65F9ZaB7Rw6WkuXFK_ADW5AWfxf_McZ2oHZiRS8pr_AJgNrCW3X786WFn9LF1o1hntccuI2yrMSJlu_yZMadMOHUsvX5Rqo_L0XbjfRtVQcaf53amstjso",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDg7bGilvWvj-IwA6w-UCc-wwrc2IhSHFCcg1e5K1GIm7j1LOo3ORqR2UzLNFlxL2QV-Gj7NbrvN2-25-qWAUyeIEon39Xf93lcvQVumItF1TkTY79l1irC7Kcx9M4VIErm09WfkC09oZahVYc1hjqkk1vAXHhoJgl7SmWAokjOf0ijlfAxIBTLLody-LrRNidTTvxhlca2o_weDGSjhJuZzhhpPeWpmnDjFTQnSnXsax0xzYCN6tprff25X9HbLNDXpziMvktLz6Y",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC-KyIk_HTSr_Yxec9bT63xlp-pE0q-gY8EdSf_u-HQjmNb6msro7jNQF_d4oUJLRz8-YyPxckkls5Mx2MvuAz-k0hS-8wsbD8RFTJJrMae4yfdwekgyFm7-vdr5AJAzGywi97w0-ajU3u1ju2walV92z2VK8Z7JKnUGf6Fl5NrLePdSEM9Sah9y0vhDMpGKNctAlnUK-WwnY6vYVKo_VO5uxdb4YANVqXe0O5x6wpdy7QWdZBI2MofZkt2Rg1eLPJ9Y_XsBk_BnWI",
];

export function BatchPreviewCard() {
  return (
    <Card className="group rounded-xl border border-[#434655]/10 !bg-[#282a32] p-stack-md shadow-md transition-colors hover:border-[#ffb873]/40">
      <div className="mb-stack-md flex items-center gap-stack-sm">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#ac6300]/10 text-[#ffb873]">
          <Users className="size-5" />
        </div>
        <h3 className="text-left font-h3 text-h3 text-[#e1e2ed]">My Batch</h3>
      </div>

      <div className="flex flex-col gap-unit">
        <div className="mb-stack-sm flex -space-x-3">
          {avatars.map((avatar) => (
            <img
              alt="Avatar"
              className="size-10 rounded-full border-2 border-[#282a32]"
              key={avatar}
              src={avatar}
            />
          ))}
          <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#282a32] bg-[#1d1f27] text-label-sm font-bold text-[#8d90a0]">
            +24
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#1d1f27] p-stack-sm">
          <span className="font-label-md text-label-md text-[#e1e2ed]">
            Alpha Squad
          </span>
          <Badge className="!bg-green-900/30 !text-green-400">Active</Badge>
        </div>
      </div>

      <p className="mt-stack-md text-left font-body-sm text-body-sm text-[#c3c6d7]">
        Collaborate with 27 like-minded peers in your dedicated workspace.
      </p>
    </Card>
  );
}
