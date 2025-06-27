export const CountryCard = ({ curData }) => {
  const { img, companyName, eventType, sponsorshipType, email, phoneNumber } =
    curData;
  return (
    <li className="country-card card ">
      <div className="container-card bg-white-box">
        <img src={img} alt={img} />

        <div className="countryInfo">
          <p className="card-title">{companyName}</p>
          <p>
            <span className="card-description">Type of Event:</span>
            {eventType}
          </p>
          <p>
            <span className="card-description">type of sponsorship:</span>
            {sponsorshipType}
          </p>
          <p>
            <span className="card-description">Email:</span>
            {email}
          </p>
          <p>
            <span className="card-description">Phone number:</span>
            {phoneNumber}
          </p>
        </div>
      </div>
    </li>
  );
};
