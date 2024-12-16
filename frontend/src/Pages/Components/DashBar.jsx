import React from "react";
import styled from "styled-components";

// Utility function to convert ms to hours and minutes
const convertMsToTime = (ms) => {
  const hours = Math.floor(ms / 3600000); // Convert ms to hours
  const minutes = Math.floor((ms % 3600000) / 60000); // Convert remaining ms to minutes
  return `${hours}h ${minutes}m`;
};

const DashBar = ({ statistics }) => {
  return (
    <StyledWrapper>
      <div className="brutalist-card">
        <div className="brutalist-card__header">
          <div className="brutalist-card__icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <div className="brutalist-card__alert">Dashboard</div>
        </div>
        <div className="statistics-container">
          {statistics ? (
            <div className="statistics-table">
              <table>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Tasks:</td>
                    <td>{statistics.totalTasks}</td>
                  </tr>
                  <tr>
                    <td>Completed Tasks (%):</td>
                    <td>{statistics.completedTasksPercent}%</td>
                  </tr>
                  <tr>
                    <td>Pending Tasks (%):</td>
                    <td>{statistics.pendingTasksPercent}%</td>
                  </tr>
                  <tr>
                    <td>Average Completion Time:</td>
                    <td>
                      {convertMsToTime(statistics.averageCompletionTime)}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>

              {statistics.pendingStatsByPriority?.length > 0 && (
                <div className="priority-tasks">
                  <h3>Pending Tasks by Priority:</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Priority</th>
                        <th>Count</th>
                        <th>Time Lapsed</th>
                        <th>Balance Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statistics.pendingStatsByPriority.map(
                        (priority, index) => (
                          <tr key={index}>
                            <td>{priority.priority}</td>
                            <td>{priority.count}</td>
                            <td>{convertMsToTime(priority.timeLapsed)}</td>
                            <td>{convertMsToTime(priority.balanceTime)}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .brutalist-card {
    width: 100%;
    border: 4px solid #000;
    background-color: #fff;
    padding: 1.5rem;
    box-shadow: 10px 10px 0 #000;
    font-family: "Arial", sans-serif;
  }

  .brutalist-card__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
  }

  .brutalist-card__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    padding: 0.5rem;
  }

  .brutalist-card__icon svg {
    height: 1.5rem;
    width: 1.5rem;
    fill: #fff;
  }

  .brutalist-card__alert {
    font-weight: 1000;
    color: #316b58; /* Main topic color */
    font-size: 3rem; /* text-3xl */
  }

  .statistics-table,
  .priority-tasks {
    margin-top: 2rem;
    width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #000;
    font-size: 1.5rem; /* text-3xl for table data */
    font-weight: 1000; /* font-[1000] */
  }

  th {
    background-color: #f4f4f4;
  }

  td {
    background-color: #fafafa;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 3rem; /* text-3xl */
    font-weight: 1000; /* font-[1000] */
    color: #316b58; /* Main topic color */
  }
`;

export default DashBar;
