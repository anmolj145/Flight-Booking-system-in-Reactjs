import axios from 'axios';

const login = async (data) => {
    const LOGIN_ENDPOINT = `http://10.12.40.85:3000/users/login`;
    await axios.post(LOGIN_ENDPOINT, data).then(response => {
        if (response.data.success === true) {
            let t = response.data.data.token;
            localStorage.setItem("token", t);
            alert("login successfull")
        }
    }).catch(err => {
        alert("login failed")
    })
}

const booking = async (fields) => {
    const ap = `http://10.12.40.85:3000/flights/bookFlight`;
    var head1 = localStorage.getItem("token");
    axios.post(ap, {
        "tripType": fields.tripType,
        "fromPlace": fields.fromPlace,
        "toPlace": fields.toPlace,
        "travelDate": fields.travelDate,
        "returnDate": fields.returnDate,
        "adultsCount": fields.adultsCount,
        "childrenCount": fields.childrenCount,
        "infantsCount": fields.infantsCount,
        "travelClass": fields.travelClass
    }, { headers: { 'x-access-token': head1.toString() } })
        .then(res => {
            alert("Booking successful")
            this.props.history.push("/showbooking")
        })
        .catch((error) => {
            console.log(error.response)
        })
}

const registration = async (fields) => {
    const ap = `http://10.12.40.85:3000/users/register`;
    axios.post(ap, {
        "email": fields.email,
        "password": fields.password,
        "firstName": fields.firstName,
        "lastName": fields.lastName,
        "mobile": fields.mobile,
        "gender": fields.gender
    })
        .then(res => {
            alert("Registration successful")
            this.props.history.push("/login")
        })
        .catch(err => {
            alert(err)
        })
}

const showB = (callback => {
    const ap = `http://10.12.40.85:3000/flights/getBookingsData`;
    var head1 = localStorage.getItem("token");
    axios.post(ap, {}, { headers: { 'x-access-token': head1.toString() } })
        .then(response => {
            callback(response);
        })
        .catch(err => {
            console.log(err)
        })
})

const st = (id) => {
    const ap = `http://10.12.40.85:3000/flights/cancelFlight`;
    var head1 = localStorage.getItem("token");
    axios.post(ap, { "bookingId": id }
        , { headers: { 'x-access-token': head1.toString() } })
        .then(res => {
            this.componentDidMount();
        })
        .catch(err => {
            console.log(err)
        })
}

export { login, registration, showB, st }
export default booking;