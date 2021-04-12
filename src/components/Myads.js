import React, { useEffect } from "react";
import { connect } from "react-redux";
import Menu from "./Menu";
import { getUser } from "../actions";
import { Link } from "react-router-dom";

const Myads = ({ ads, getUser }) => {
  useEffect(() => {
    getUser();
  }, []);

  const handleToken = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Menu />
      <h1 style={{ textAlign: "center" }}>Your Ads</h1>
      <div className="ads__wrapper">
        {ads &&
          ads.ads.map((ad) => {
            return (
              <div className="ad__video-container">
                <video height="400px" width="400px" controls>
                  <source src={ad.videourl} type="video/mp4" />
                </video>
                <div>
                  <h4>name: {ad.adname}</h4>
                  <h4>Time: {ad.timings}</h4>
                  <h4>
                    Release Date:{" "}
                    {new Date(ad.releasedate).getUTCDate() +
                      "-" +
                      new Date(ad.releasedate).getMonth() +
                      "-" +
                      new Date(ad.releasedate).getFullYear()}
                  </h4>
                  {ad.payment ? (
                    <p style={{ color: "#1cc60d" }}>
                      payment is done your ad will be ready on provided date
                    </p>
                  ) : (
                    <p>
                      Make a payment for broadcast
                      <Link
                        className="checkout__btn"
                        to={`/ad/checkout/${ad._id}`}
                      >
                        checkout  
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ adReducers }) => {
  return {
    ads: adReducers.user,
  };
};

export default connect(mapStateToProps, { getUser })(Myads);
