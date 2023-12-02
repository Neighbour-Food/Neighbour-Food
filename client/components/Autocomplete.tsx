// Autocomplete.js
import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { RootState } from "../state/store";

import { setFormData } from "../state/user/userSlice";
import { useSelector, useDispatch } from "react-redux/";

const Autocomplete = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.user.formData);
  // const address = useSelector((state: RootState) => state.user.address);

  const [address, setAddress] = useState('');

  const handleSelect = async (selectedAddress) => {
    setAddress(selectedAddress);
    // dispatch(setAddress(selectedAddress))

    try {
      const results = await geocodeByAddress(selectedAddress);
      // console.log('result:', results)

      dispatch(setFormData({
        ...formData,
        address: results[0].formatted_address,
      }));
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={(newAddress) => setAddress(newAddress)}
        // onChange={(newAddress) => dispatch(setAddress(newAddress))}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => (
                <div
                  {...getSuggestionItemProps(suggestion)}
                  key={suggestion.id}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Autocomplete;

