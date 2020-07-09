import React, { useState, useEffect } from "react";
import styled from "styled-components";
import JobCard from "./JobCard";
import { getUserMatches, acceptJob, rejectJob } from "../../API/";
// import MockJobs from "../../API/mockData/jobs";

const StyledJobList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    > li {
      margin-bottom: 15px;
    }
  }
`;
function JobCardList({ workerId }) {
  const [jobData, setJobData] = useState([]);

  // Get initial job list
  useEffect(() => {
    if (workerId) {
      getUserMatches(workerId).then((res) => setJobData(res));
    } else {
      setJobData([]);
    }
  }, [workerId]);

  if (!workerId) {
    return <StyledJobList>Nothing to see here</StyledJobList>;
  }

  // Job decision handlers
  const rejectJobHandler = (jobId, job) => {
    rejectJob(workerId, jobId).then((res) => {
      if (res.success) {
        const filteredJobs = jobData.filter((job) => job.jobId !== jobId);
        setJobData(filteredJobs);
      }
    });
  };
  const acceptJobHandler = (jobId, job) => {
    acceptJob(workerId, jobId).then((res) => {
      if (res.success) {
        alert(`Job taken!`);
        const otherJobs = jobData.filter((job) => job.jobId !== jobId);
        const updatedJob = {...job};
        updatedJob.isTaken = true;
        setJobData([...otherJobs, updatedJob])
      } else {
        alert(`Job taken failed, reason: ${res.errorCode} ${res.message}`);
        const filteredJobs = jobData.filter((job) => job.jobId !== jobId);
        setJobData(filteredJobs);
      }
    });
  };

  return (
    <StyledJobList>
      {jobData.map((job) => (
        <li key={job.jobId}>
          <JobCard job={job} onAcceptJob={acceptJobHandler} onRejectJob={rejectJobHandler} />
        </li>
      ))}
    </StyledJobList>
  );
}

export default JobCardList;
