import { festivals } from "../../data/festivals";
import FestivalPageClient from "./FestivalPageClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return festivals.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const festival = festivals.find((f) => f.slug === slug);
  if (!festival) return {};
  return { title: `${festival.name} | Shrikrishna Thodsare`, description: festival.tagline };
}

export default async function FestivalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const festival = festivals.find((f) => f.slug === slug);
  if (!festival) return notFound();
  return <FestivalPageClient festival={festival} />;
}