import type { Metadata } from "next";
import { JobDetailPage } from "@/components/JobDetailPage";
import { JOBS, getJob } from "@/data/jobs";

export function generateStaticParams() {
  return JOBS.map((j) => ({ id: j.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = getJob(id);
  if (!job) return { title: "Vacancy not found" };
  return { title: `${job.title} · ${job.company}`, description: job.summary };
}

export default async function VacancyJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <JobDetailPage jobId={id} />;
}
