import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMapMarkerAlt, faTools, faUserCircle } from "@fortawesome/free-solid-svg-icons";

// long relative path can be fixed by alias in webpack
import { StyledJobCard, StyledJobDescription, StyledJobHeading } from "./styles";
import { formatPhone, formatShiftTimePeriod } from "../../../utils";
import { PrimaryButton, SecondaryButton } from "../../Buttons";

/* Job Card is a presentational components which can be easily tested */
function JobCard({ job, onAcceptJob, onRejectJob }) {
  if (!job) {
    return <>Error, No job data provided</>;
  }

  const { jobTitle, company, milesToTravel, wagePerHourInCents, shifts, requirements, isTaken = false } = job;

  return (
    <StyledJobCard isTaken={isTaken}>
      <StyledJobHeading>
        <img src={jobTitle.imageUrl} alt={jobTitle.name} />
        <h1>{jobTitle.name}</h1>
        <h2>{company.name}</h2>
      </StyledJobHeading>

      <StyledJobDescription>
        {/* Main section */}
        <section className="heading">
          <div>
            <p className="heading_label">Distance</p>
            <span className="heading_value">{milesToTravel.toFixed(2)} miles</span>
          </div>
          <div>
            <p className="heading_label">Hourly Rate</p>
            <span className="heading_value">
              <sup>$</sup>
              {(wagePerHourInCents / 100).toFixed(2)}
            </span>
          </div>
        </section>

        {/* Date section */}
        <section className="dates">
          <div className="icon">
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
          <div className="content">
            <p className="title">ShiftDates</p>
            <ul className="shiftTimes">
              {shifts.map((shift) => (
                <li key={shift.startDate}>{formatShiftTimePeriod(shift.startDate, shift.endDate)}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Location section */}
        <section className="location">
          <div className="icon">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <div className="content">
            <p className="title">Location</p>
            <p className="value">{company?.address?.formattedAddress}</p>
            <p className="info">{milesToTravel} miles from your job search location</p>
          </div>
        </section>

        {/* Requirement section */}
        {requirements && (
          <section className="requirement">
            <div className="icon">
              <FontAwesomeIcon icon={faTools} />
            </div>
            <div className="content">
              <p className="title">Requirement</p>
              <ul className="value">
                {requirements.map((requirement) => (
                  <li key={requirement}>- {requirement}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Report section */}
        {company.reportTo && (
          <section className="report">
            <div className="icon">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <div className="content">
              <p className="title">Report To</p>
              <p className="value">{`${company?.reportTo?.name} ${formatPhone(company?.reportTo?.phone)}`}</p>
            </div>
          </section>
        )}

        <section className="actions">
          <SecondaryButton onClick={() => onRejectJob(job.jobId, job)}>No thanks</SecondaryButton>
          <PrimaryButton onClick={() => onAcceptJob(job.jobId, job)}>Take it</PrimaryButton>
        </section>
      </StyledJobDescription>
    </StyledJobCard>
  );
}

export default JobCard;
