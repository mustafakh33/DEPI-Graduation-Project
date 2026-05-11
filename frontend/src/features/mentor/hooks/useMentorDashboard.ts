import { useMemo, useState } from "react";
import { batches } from "../data/DashMockData";

export const useMentorDashboard = () => {
    const [selectedBatchId, setSelectedBatchId] =
    useState<string>(batches[0].id);

  const selectedBatch = useMemo(() => {
    return batches.find(
      (batch) => batch.id === selectedBatchId
    );
  }, [selectedBatchId]);

  const students = selectedBatch?.students || [];

  const topPerformers = students
    .filter((student) => student.gpa >= 3.5)
    .slice(0, 3);

  const riskStudents = students.filter(
    (student) => student.risk
  );

  return {
    batches,
    selectedBatch,
    selectedBatchId,
    setSelectedBatchId,
    students,
    topPerformers,
    riskStudents,
  };
};