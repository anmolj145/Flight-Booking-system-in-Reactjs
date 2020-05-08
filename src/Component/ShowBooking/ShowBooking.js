import React from 'react';
import './ShowBooking.css'
import { showB, st } from '../../Service/service';

class ShowBooking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sb: []
        }
    }

    statusChange = (id) => {
        st(id);
    }

    componentDidMount() {
        const setst = (response) => {
            this.setState({ sb: response.data.data })
        }
        showB(setst);
    }

    showTicket = () => {
        this.props.history.push("/showticket")
    }

    render() {
        return (
            <div className="sb" >
                {this.state.sb && this.state.sb.map(p => (
                    <div key={p._id} className="tic">
                        <h3>{p.fromPlace} &nbsp; &nbsp;  &#9992; &nbsp; &nbsp; {p.toPlace}</h3>
                        <p>{p.travelDate.substring(0, 10)}</p>
                        <p><strong>{p.status}</strong></p>
                        {(p.status === "booked") ? (<button onClick={() => this.statusChange(p._id)}>Cancel</button>) : null}
                        <button onClick={() => {
                            localStorage.setItem("ticket", JSON.stringify(p))
                            this.showTicket()
                        }} className="showt">Show Ticket</button>
                    </div>
                ))}
            </div>
        );
    }
}
export default ShowBooking;