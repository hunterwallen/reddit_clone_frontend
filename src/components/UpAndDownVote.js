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
      <div>

        {this.props.currentUser.username ?
          (this.props.currentUser.post_reaction_id === null ?
            <div>
              <div className="upVoteDiv">
                <img src="https://i.imgur.com/FGPc6SG.png" onClick={this.upVote} />
              </div>
              <div className="voteCount">
                <h3>{this.props.votes} Votes</h3>
              </div>
              <div className="upVoteDiv">
                <img src="https://i.imgur.com/4orOVpv.png" onClick={this.downVote} />
              </div>
            </div>


          :
          (this.props.currentUser.post_reaction_id.includes(this.props.post_id) ?
                  <div className="voteCount">
                    <h3>{this.props.votes} Votes</h3>
                  </div>

                :
                  <div>
                    <div className="upVoteDiv">
                      <img src="https://i.imgur.com/FGPc6SG.png" onClick={this.upVote} />
                    </div>
                    <div className="voteCount">
                      <h3>{this.props.votes} Votes</h3>
                    </div>
                    <div className="upVoteDiv">
                      <img src="https://i.imgur.com/4orOVpv.png" onClick={this.downVote} />
                    </div>
                  </div>

                  )
              )

        :

            <div className="voteCount">
              <h3>{this.props.votes} Votes</h3>
            </div>
          }

      </div>
    )
  }

}

export default UpAndDownVote
