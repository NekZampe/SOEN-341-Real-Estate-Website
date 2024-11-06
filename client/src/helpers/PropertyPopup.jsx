import React, { useEffect, useState } from "react";
import axios from "axios";
import BrokerDetails from "./brokerDetails";
import PickADate from "./pickADate";
import { useUserContext } from "../context/userContext";
import OfferForm from "./offerForm";
import PropertyDetails from "./propertyDetails";
import LeafletMap from './leafletMap';
import MortgageCalculator from "./MortgageCalculator";


const PropertyPopup = ({ propertyID, ownerID, saleType, onClose}) => {
  const { user} = useUserContext();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [brokerDetails, setBrokerDetails] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isOfferFormVisible, setOfferFormVisible] = useState(false);
  const [isMortgageVisible, setMortgageVisible] = useState(false);

  //Retrieve Broker Data
  useEffect(() => {
    if (ownerID) {
      axios
        .get(`http://localhost:3000/users/owner/${ownerID}`)
        .then((response) => {
          console.log(response.data);
          setBrokerDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [ownerID]);

  useEffect(() => {
    if (propertyID) {
      axios
        .get(`http://localhost:3000/properties/${propertyID}`)
        .then((response) => {
          console.log(response.data);
          setPropertyDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [ownerID]);

  const handleOfferFormClose = () => {
    setOfferFormVisible(false);
  };

  const handleRequestVisitClick = () => {
    setIsDatePickerVisible(true);
  };

  const handleRequestOfferClick = () => {
    setOfferFormVisible(true);
  };

  const handleMortgageClick = () => {
    setMortgageVisible(true);
  };

  const handleMortgageClose = () => {
    setMortgageVisible(false);
  };


  const handleVisitRequest = (selectedDate) => {
    const visitData = {
      client: user._id,
      property: propertyID,
      broker: ownerID,
      requestedDate: selectedDate,
      status: "pending",
    };


    // RequestVisit
    axios
      .post("http://localhost:3000/requestVisit/request", visitData)
      .then((response) => {
        console.log("Visit request submitted successfully:", response.data);
        alert("Request sent!");
      })
      .catch((error) => {
        console.error("Error submitting visit request:", error);
      });
  };


//Submit Offer
const handleOfferRequest = async (offerData) => {
  try {
    const requestData = {
      propertyId: propertyID, // Add propertyID to the offer data
      userId: user._id, // Add user._id to the offer data
      offerAmount: parseInt(offerData.offerAmount),
      offerType: saleType, // Assuming saleType is coming from the form component
      additionalTerms: offerData.additionalTerms,
      status: 'pending', // Default status to 'pending'
    };
    console.log("Offer Data:", requestData);
    await axios.post('http://localhost:3000/offer/new', requestData);
    // Handle success, e.g., show a success message or redirect the user
    console.log('Offer submitted successfully!');
    alert('Offer submitted successfully!');
  } catch (error) {
    // Handle error, e.g., display an error message to the user
    console.error('Error submitting offer:', error);
    alert("Error. Please Try Again later...")
  }
};


  
  if (!brokerDetails) {
    return <div>Loading...</div>
  }


  return (

    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg z-50 flex justify-end relative">
      <PropertyDetails property={propertyDetails} />
      <BrokerDetails broker={brokerDetails} />
      <div className="absolute bottom-0 right-0 w-400 h-300 z-10">
        <LeafletMap />
      </div>
      
        <div className="mt-3">
          <button
            className="bg-red-500 hover:bg-white text-white hover:text-red-500 px-4 py-2 rounded transition duration-300 ease-in-out absolute top-2 left-2 "
            onClick={onClose}
          >
            Close
          </button>
          
          {!isDatePickerVisible && (
            <button
              className="bg-blue-500 hover:bg-white text-white hover:text-blue-500 px-4 py-2 rounded transition duration-300 ease-in-out mx-2 my-2"
              onClick={handleRequestVisitClick}
            >
              Request Visit
            </button>
          )}
          {isDatePickerVisible && (
            <PickADate
              onSubmit={(selectedDate) => {
                setIsDatePickerVisible(false);
                handleVisitRequest(selectedDate);
              }}
              
            />
            
          )}
        </div>
        {!isOfferFormVisible && (
  <button
  className="bg-yellow-500 hover:bg-white text-white hover:text-yellow-500 mt-5 px-6 rounded transition duration-300 ease-in-out mx-2 my-5 h-12"
  onClick={handleRequestOfferClick}
>
  Submit An Offer
</button>

          
        )}
        {isOfferFormVisible && (
          <div className="flex flex-col">
            <OfferForm
              saleType={saleType}
              onRequest={(offerData) => {
                setOfferFormVisible(false);
                handleOfferRequest(offerData);
              }}
            />
            
             <button
              className="bg-red-500 hover:bg-white text-white hover:text-red-500 px-4 py-2 rounded transition duration-300 ease-in-out mb-2"
              onClick={handleOfferFormClose}
            >
              Close Offer Form
            </button>
       </div>
          )}
      </div>
      <MortgageCalculator/>
    </div>
  );
};

export default PropertyPopup;
