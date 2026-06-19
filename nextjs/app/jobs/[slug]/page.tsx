import type { Metadata } from "next";
import { JobDetailPage } from "@/components/JobDetailPage";
import { JOBS, getJob } from "@/data/jobs";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Job not found" };
  return { title: `${job.title} - ${job.sourceLabel ?? job.company}`, description: job.summary };
}

export default async function PublicJobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <JobDetailPage jobId={slug} />;
}
