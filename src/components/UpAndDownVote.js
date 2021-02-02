import React, { Component } from 'react'


class UpAndDownVote extends Component {

  upVote = () => {
    this.props.upVote(this.props.post_id)
  }

  downVote = () => {
    this.props.downVote(this.props.post_id)
  }


  render = () => {
    return (
      <div className="upAndDownVoteContainer">

        {this.props.currentUser.username ?
          (this.props.currentUser.post_reaction_id === null ?
            <div className="votesHolderDiv">
              <div className="upVoteDiv">
                <img src="https://i.imgur.com/4orOVpv.png" onClick={this.downVote} className="upAndDownVoteImage" />
              </div>
              <div className="voteCount">
                <h3 className="votesCounterNumber">{this.props.votes}</h3>
              </div>
              <div className="upVoteDiv">
                <img src="https://i.imgur.com/FGPc6SG.png" onClick={this.upVote} className="upAndDownVoteImage" />
              </div>
            </div>


          :
          (this.props.currentUser.post_reaction_id.includes(this.props.post_id) ?
          <div className="votesHolderDiv">
            <div className="upVoteDiv">
              <img src="https://i.imgur.com/4orOVpv.png" className="upAndDownVoteImage noVoting" />
            </div>
            <div className="voteCount">
              <h3 className="votesCounterNumber">{this.props.votes}</h3>
            </div>
            <div className="upVoteDiv">
              <img src="https://i.imgur.com/FGPc6SG.png" className="upAndDownVoteImage noVoting" />
            </div>
          </div>

                :
                <div className="votesHolderDiv">
                  <div className="upVoteDiv">
                    <img src="https://i.imgur.com/4orOVpv.png" onClick={this.downVote} className="upAndDownVoteImage" />
                  </div>
                  <div className="voteCount">
                    <h3 className="votesCounterNumber">{this.props.votes}</h3>
                  </div>
                  <div className="upVoteDiv">
                    <img src="https://i.imgur.com/FGPc6SG.png" onClick={this.upVote} className="upAndDownVoteImage" />
                  </div>
                </div>

                  )
              )

        :

        <div className="votesHolderDiv">
          <div className="upVoteDiv">
            <img src="https://i.imgur.com/4orOVpv.png" className="upAndDownVoteImage noVoting" />
          </div>
          <div className="voteCount">
            <h3 className="votesCounterNumber">{this.props.votes}</h3>
          </div>
          <div className="upVoteDiv">
            <img src="https://i.imgur.com/FGPc6SG.png" className="upAndDownVoteImage noVoting" />
          </div>
        </div>
          }

      </div>
    )
  }

}

export default UpAndDownVote
