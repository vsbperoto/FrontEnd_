import React from "react";
import {
  Camera,
  CheckCircle,
  FileText,
  Film,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import type {
  PricingPackageContent,
  PricingPackageIcon,
} from "../translations/types";

const iconComponents: Record<PricingPackageIcon, React.ElementType> = {
  camera: Camera,
  film: Film,
  sparkles: Sparkles,
  star: Star,
  users: Users,
};

const iconGradients: Record<PricingPackageIcon, string> = {
  camera: "from-[#8B4789] to-[#C154C1]",
  film: "from-[#87A96B] to-[#8B6F47]",
  sparkles: "from-[#c9705f] to-[#e97451]",
  star: "from-[#C65D00] to-[#E97451]",
  users: "from-[#7c9885] to-[#6a8470]",
};

interface PackageCardProps {
  pkg: PricingPackageContent;
  ctaLabel: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, ctaLabel }) => {
  const Icon = iconComponents[pkg.icon];
  const gradient = iconGradients[pkg.icon];

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border-2 bg-white/90 p-6 sm:p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
        pkg.featured ? "border-[#c9705f]" : "border-[#e5d5c8]"
      }`}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className={`absolute top-0 right-0 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} blur-3xl`}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center mb-6">
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className="h-8 w-8" />
          </div>
          <h3
            className="text-xl sm:text-2xl font-semibold text-[#2c3831]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {pkg.title}
          </h3>
          <p className="text-sm sm:text-base text-[#2c3831]/70">
            {pkg.subtitle}
          </p>
        </div>

        <div className="mb-6 text-center">
          <div className="text-4xl sm:text-5xl font-bold text-[#c9705f]">
            {pkg.price.bgn}
          </div>
          <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-[#f5e6d3] px-3 py-1 text-sm font-medium text-[#2c3831]/70">
            {pkg.price.eur}
          </div>
          <div className="mt-4 inline-flex items-center rounded-full bg-white/80 px-4 py-1 text-sm font-semibold text-[#2c3831] shadow-sm">
            {pkg.coverage}
          </div>
        </div>

        {pkg.highlights.length > 0 && (
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {pkg.highlights.map((highlight, index) => (
              <span
                key={index}
                className="rounded-full border border-[#f0d8c3] bg-[#f5e6d3]/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#7c9885]"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        <div className="flex-1 space-y-5">
          {pkg.sections.map((section, sectionIndex) => (
            <div
              key={`${pkg.id}-section-${sectionIndex}`}
              className="rounded-2xl bg-white/80 p-4 shadow-sm"
            >
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c9705f]">
                {section.title}
              </h4>
              <ul className="space-y-3 text-[#2c3831]">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={`${pkg.id}-item-${sectionIndex}-${itemIndex}`}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#7c9885]" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {pkg.premiumNote && (
          <div className="mt-6 rounded-2xl bg-[#2c3831]/5 p-4 text-sm italic text-[#2c3831]/80">
            {pkg.premiumNote}
          </div>
        )}

        <div className="mt-8">
          <a
            href="#contact"
            className="block w-full rounded-2xl bg-gradient-to-r from-[#7c9885] to-[#6a8470] px-6 py-4 text-center text-lg font-semibold text-white transition-all duration-300 hover:shadow-xl group-hover:scale-105"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const { language, translations } = useLanguage();
  const packagesCopy = translations[language].packages;
  const pricingContent = translations[language].pricingSection;
  const comboPackage = pricingContent.comboPackage;
  const ComboIcon = iconComponents[comboPackage.icon];
  const comboGradient = iconGradients[comboPackage.icon];

  return (
    <section
      id="packages"
      className="relative overflow-hidden bg-gradient-to-br from-[#faf8f3] to-[#f5e6d3] py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 h-40 w-40 rounded-full bg-gradient-to-br from-[#C65D00] to-[#E97451] blur-3xl" />
        <div className="absolute bottom-20 right-20 h-32 w-32 rounded-full bg-gradient-to-br from-[#87A96B] to-[#8B6F47] blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#8B4789] to-[#C154C1] opacity-30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2
            className="mb-4 text-3xl font-light text-[#2c3831] sm:mb-6 sm:text-4xl md:text-5xl"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            {packagesCopy.title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-[#2c3831]/70 sm:text-lg md:text-xl">
            {packagesCopy.subtitle}
          </p>
        </div>

        <div className="mx-auto mb-12 max-w-4xl">
          <div className="flex flex-col gap-6 rounded-3xl border border-[#e5d5c8] bg-white/90 p-6 shadow-xl sm:flex-row sm:items-center sm:p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c9885] to-[#6a8470] text-white shadow-lg">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <div className="mb-2 inline-flex rounded-full bg-[#f5e6d3] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9705f]">
                {pricingContent.contractHighlight.badge}
              </div>
              <h3
                className="mb-3 text-2xl font-semibold text-[#2c3831] sm:text-3xl"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {pricingContent.contractHighlight.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#2c3831]/80 sm:text-base">
                {pricingContent.contractHighlight.description}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          <div>
            <div className="mb-8 text-center">
              <h3
                className="mb-3 text-2xl font-semibold text-[#2c3831] sm:text-3xl"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {pricingContent.photoPackagesTitle}
              </h3>
              <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[#2c3831]/70 sm:text-base">
                {pricingContent.photoPackagesSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-4">
              {pricingContent.photoPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  ctaLabel={pricingContent.selectPackage}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8 text-center">
              <h3
                className="mb-3 text-2xl font-semibold text-[#2c3831] sm:text-3xl"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {pricingContent.videoPackagesTitle}
              </h3>
              <p className="mx-auto max-w-3xl text-sm leading-relaxed text-[#2c3831]/70 sm:text-base">
                {pricingContent.videoPackagesSubtitle}
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
              {pricingContent.videoPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  ctaLabel={pricingContent.selectPackage}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="absolute inset-0 scale-110 rounded-3xl bg-gradient-to-r from-[#c9705f]/20 via-[#e97451]/30 to-[#c9705f]/20 blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border-4 border-[#c9705f] bg-gradient-to-br from-[#2c3831] via-[#3a4a3e] to-[#2c3831] shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#C65D00] to-[#E97451] blur-2xl animate-pulse" />
              <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-gradient-to-br from-[#87A96B] to-[#8B6F47] blur-2xl animate-pulse delay-1000" />
              <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#8B4789] to-[#C154C1] opacity-30 blur-3xl animate-pulse delay-500" />
            </div>

            <div className="relative z-10 p-8 sm:p-12">
              <div className="mx-auto max-w-4xl text-center text-white">
                <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${comboGradient} text-white shadow-xl transition-transform duration-300 hover:scale-110`}
                  >
                    <ComboIcon className="h-10 w-10" />
                  </div>
                  <div>
                    <h3
                      className="text-3xl font-bold sm:text-4xl"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {comboPackage.title}
                    </h3>
                    <p className="text-white/80">{comboPackage.subtitle}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-5xl font-bold text-[#e97451] sm:text-6xl">
                    {comboPackage.price.bgn}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-base font-medium text-white/80 backdrop-blur-sm">
                    {comboPackage.price.eur}
                  </div>
                  <div className="mt-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white/80 backdrop-blur-sm">
                    {comboPackage.coverage}
                  </div>
                </div>

                <div className="mb-8 flex flex-wrap justify-center gap-3">
                  {comboPackage.highlights.map((highlight, index) => (
                    <span
                      key={`combo-highlight-${index}`}
                      className="rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/80"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="grid gap-4 text-left sm:grid-cols-2">
                  {comboPackage.sections.map((section, sectionIndex) => (
                    <div
                      key={`combo-section-${sectionIndex}`}
                      className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm"
                    >
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#e97451]">
                        {section.title}
                      </h4>
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <li
                            key={`combo-item-${sectionIndex}-${itemIndex}`}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#e97451]" />
                            <span className="text-sm leading-relaxed text-white/90">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {comboPackage.bonuses && (
                  <div className="mt-8 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#e97451]">
                      {pricingContent.allIncluded}
                    </h4>
                    <ul className="flex flex-wrap justify-center gap-3 text-sm text-white/90">
                      {comboPackage.bonuses.map((bonus, index) => (
                        <li
                          key={`combo-bonus-${index}`}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-5 w-5 text-[#e97451]" />
                          <span>{bonus}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <blockquote className="mt-8 text-base italic text-white/80">
                  {comboPackage.quote}
                </blockquote>

                <div className="mt-10 flex justify-center">
                  <a
                    href="#contact"
                    className="inline-block rounded-2xl bg-gradient-to-r from-[#e97451] to-[#c9705f] px-8 py-4 text-xl font-bold text-white transition-all duration-300 hover:shadow-2xl"
                  >
                    {pricingContent.selectPackage}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="mx-auto max-w-5xl rounded-3xl border border-[#e5d5c8] bg-white/80 p-8 shadow-xl backdrop-blur-md sm:p-12">
            <h3
              className="mb-8 text-2xl font-semibold text-[#2c3831] sm:text-3xl"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {pricingContent.whyChooseUs}
            </h3>

            <div className="mb-8 grid gap-8 md:grid-cols-3">
              <div className="group text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c9885] to-[#6a8470] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <FileText className="h-10 w-10" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-[#2c3831]">
                  {pricingContent.officialContract}
                </h4>
                <p className="text-sm leading-relaxed text-[#2c3831]/70">
                  {pricingContent.contractDescription}
                </p>
              </div>

              <div className="group text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c9705f] to-[#e97451] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-[#2c3831]">
                  {pricingContent.personalApproach}
                </h4>
                <p className="text-sm leading-relaxed text-[#2c3831]/70">
                  {pricingContent.personalDescription}
                </p>
              </div>

              <div className="group text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#87A96B] to-[#8B6F47] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Film className="h-10 w-10" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-[#2c3831]">
                  {pricingContent.emotionalCapture}
                </h4>
                <p className="text-sm leading-relaxed text-[#2c3831]/70">
                  {pricingContent.emotionalDescription}
                </p>
              </div>
            </div>

            <div className="mt-12 border-t border-[#e5d5c8] pt-8">
              <div className="flex flex-wrap items-center justify-center gap-8 text-[#2c3831]/60">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#7c9885]" />
                  <span className="text-sm font-medium">
                    {pricingContent.insurance}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[#c9705f]" />
                  <span className="text-sm font-medium">
                    {pricingContent.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#8B4789]" />
                  <span className="text-sm font-medium">
                    {pricingContent.experience}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
