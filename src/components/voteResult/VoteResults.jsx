import React from "react";
import "./VoteResults.css";

const VoteResults = ({ redVotes, blueVotes, winningVoteType, redVotePercentage, blueVotePercentage }) => {
  return (
    <div className="vote-results-container">
      <h2>투표 결과</h2>
      <div className="vote-results">
        <div className="vote-result-item">
          <h3>RED</h3>
          <p>{redVotes}표</p>
          <p>{Number(redVotePercentage).toFixed(2)}%</p>
        </div>
        <div className="vote-result-item">
          <h3>BLUE</h3>
          <p>{blueVotes}표</p>
          <p>{Number(blueVotePercentage).toFixed(2)}%</p>
        </div>
        <div className="vote-winner">
          <h3>승리</h3>
          <p>{winningVoteType}</p>
        </div>
      </div>
    </div>
  );
};

export default VoteResults;
