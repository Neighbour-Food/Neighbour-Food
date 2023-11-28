import React, { FC } from "react";

const Signup: FC = () => {
  const states = ["", "AK - Alaska", "AL - Alabama", "AR - Arkansas", "AS - American Samoa", "AZ - Arizona", "CA - California", "CO - Colorado", "CT - Connecticut", "DC - District of Columbia", "DE - Delaware", "FL - Florida", "GA - Georgia", "GU - Guam", "HI - Hawaii", "IA - Iowa", "ID - Idaho", "IL - Illinois", "IN - Indiana", "KS - Kansas", "KY - Kentucky", "LA - Louisiana", "MA - Massachusetts", "MD - Maryland", "ME - Maine", "MI - Michigan", "MN - Minnesota", "MO - Missouri", "MS - Mississippi", "MT - Montana", "NC - North Carolina", "ND - North Dakota", "NE - Nebraska", "NH - New Hampshire", "NJ - New Jersey", "NM - New Mexico", "NV - Nevada", "NY - New York", "OH - Ohio", "OK - Oklahoma", "OR - Oregon", "PA - Pennsylvania", "PR - Puerto Rico", "RI - Rhode Island", "SC - South Carolina", "SD - South Dakota", "TN - Tennessee", "TX - Texas", "UT - Utah", "VA - Virginia", "VI - Virgin Islands", "VT - Vermont", "WA - Washington", "WI - Wisconsin", "WV - West Virginia", "WY - Wyoming"]

  return (
    <>
      <div className="signup">
        <section className="side-bar non-profit">
          <p>Welcome</p>
          <h1>Neigbour Food</h1>
          {/* <h1 className="shadow">Neigbour Food</h1> */}
        </section>
        <section className="hero">
          <form>
            <nav>
              <button type='button' value='NON-PROFIT'>NON-PROFIT</button>
              <button type='button' value='RESTAURANT'>RESTAURANT</button>
            </nav>
            <h2>SIGN UP TO NEIGHBOUR FOOD</h2>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <h3>CONTACT INFO</h3>
            <div className="org-name">
              <div className="column">
                <label htmlFor="org">Name of Org</label>
                <input type="text" name="org" />
              </div>
              <div>
                <label htmlFor="contact">Contact Name</label>
                <input type="text" name="contact" />
              </div>
            </div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" />
            <label htmlFor="phone">Phone Number</label>
            <input type="text" name="phone" />
            <label htmlFor="phone">Phone Number</label>
            <input type="text" name="phone" />
            <label htmlFor="street">Street Adress</label>
            <input type="text" name="street" />
            <div className="address">
              <div>
                <label htmlFor="city">City</label>
                <input type="text" name="city" />
              </div>
              <div>
                <label htmlFor="contact">State</label>
                <select className="state" name="state">
                  {states.map((state) => <option value={state} key={state}>{state}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="zip">Zip</label>
                <input type="text" name="zip" />
              </div>
            </div>
            <label htmlFor="pickup">Pick Up Radius</label>
            <input type="text" name="pickup" />
            <button className="black-button" type="button">SIGN UP</button>
          </form>
        </section >
      </div>
    </>
  );
};

export default Signup;
