import sponsorList from "../api/sponsorList.json";
export const About = () => {
  return (
    <>
      <div className="section-about container">
        <h2 className="container-title ">Our Top Sponsors</h2>
        <div className="gradient-cards ">
          {sponsorList.map((curData) => {
            const { id, companyName, eventType, sponsorshipType } = curData;
            return (
              <div className="card" key={id}>
                <div className="container-card bg-yellow-box">
                  <p className="card-title">{companyName}</p>
                  <p>
                    <span className="card-description">Type of Event:</span>
                    {eventType}
                  </p>
                  <p>
                    <span className="card-description">
                      Type of Sponsorship:
                    </span>
                    {sponsorshipType}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
