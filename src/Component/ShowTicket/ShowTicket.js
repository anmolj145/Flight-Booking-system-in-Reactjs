import React from 'react';
import './ShowTicket.css'

class ShowTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            st: []
        }
    }

    goBack = () => {
        localStorage.removeItem("ticket")
        this.props.history.push("/showbooking")
    }

    render() {
        var ticket = JSON.parse(localStorage.getItem('ticket'));
        return (
            <div className="st" >
                <h3>{ticket.fromPlace} &nbsp; &nbsp;  &#9992; &nbsp; &nbsp; {ticket.toPlace}</h3>
                <p>Status - <strong>{ticket.status}</strong></p>
                <p>Trip type  - <strong>{ticket.tripType} </strong> </p>
                <p>Travel Date -  {ticket.travelDate.substring(0, 10)}</p>
                {ticket.returnDate !== null ? (<p> Return Date -  {ticket.returnDate.substring(0, 10)}</p>) : null}
                <p>Travel Class  - <strong>{ticket.travelClass} </strong> </p>
                <p>Adult  - <strong>{ticket.adultsCount} </strong> </p>
                <p>Children  - <strong>{ticket.childrenCount} </strong> </p>
                <p>Infant  - <strong>{ticket.infantsCount} </strong> </p>
                <button onClick={this.goBack}>Back</button>
            </div >
        );
    }
}
export default ShowTicket;