const indiaStateCities = [
    {
        state: "Tamil Nadu",
        cities: [
            "Ariyalur",
            "Chengalpattu",
            "Chennai",
            "Coimbatore",
            "Cuddalore",
            "Dharmapuri",
            "Dindigul",
            "Erode",
            "Kallakurichi",
            "Kanchipuram",
            "Kanyakumari",
            "Karur",
            "Krishnagiri",
            "Madurai",
            "Mayiladuthurai",
            "Nagapattinam",
            "Namakkal",
            "Nilgiris",
            "Perambalur",
            "Pudukkottai",
            "Ramanathapuram",
            "Ranipet",
            "Salem",
            "Sivaganga",
            "Tenkasi",
            "Thanjavur",
            "Theni",
            "Thoothukudi",
            "Tiruchirappalli",
            "Tirunelveli",
            "Tirupathur",
            "Tiruppur",
            "Tiruvallur",
            "Tiruvannamalai",
            "Tiruvarur",
            "Vellore",
            "Viluppuram",
            "Virudhunagar"
        ]
    },
    {
        state: "Kerala",
        cities: [
            "Alappuzha",
            "Ernakulam",
            "Idukki",
            "Kannur",
            "Kasaragod",
            "Kollam",
            "Kottayam",
            "Kozhikode",
            "Malappuram",
            "Palakkad",
            "Pathanamthitta",
            "Thiruvananthapuram",
            "Thrissur",
            "Wayanad"
        ]
    },
    {
        state: "Andhra Pradesh",
        cities: [
            "Alluri Sitharama Raju",
            "Anakapalli",
            "Ananthapuramu",
            "Annamayya",
            "Bapatla",
            "Chittoor",
            "East Godavari",
            "Eluru",
            "Guntur",
            "Kakinada",
            "Konaseema",
            "Krishna",
            "Kurnool",
            "Nandyal",
            "NTR",
            "Palnadu",
            "Parvathipuram Manyam",
            "Prakasam",
            "SPS Nellore",
            "Srikakulam",
            "Tirupati",
            "Visakhapatnam",
            "Vizianagaram",
            "West Godavari",
            "YSR Kadapa"
        ]
    },

    {
        state: "Arunachal Pradesh",
        cities: ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila"]
    },
    {
        state: "Assam",
        cities: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"]
    },
    {
        state: "Bihar",
        cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"]
    },
    {
        state: "Chhattisgarh",
        cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"]
    },
    {
        state: "Goa",
        cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"]
    },
    {
        state: "Gujarat",
        cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"]
    },
    {
        state: "Haryana",
        cities: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar"]
    },
    {
        state: "Himachal Pradesh",
        cities: ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi"]
    },
    {
        state: "Jharkhand",
        cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"]
    },
    {
        state: "Karnataka",
        cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belgaum"]
    },

    {
        state: "Madhya Pradesh",
        cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"]
    },
    {
        state: "Maharashtra",
        cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"]
    },
    {
        state: "Manipur",
        cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"]
    },
    {
        state: "Meghalaya",
        cities: ["Shillong", "Tura", "Nongstoin", "Baghmara", "Jowai"]
    },
    {
        state: "Mizoram",
        cities: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip"]
    },
    {
        state: "Nagaland",
        cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"]
    },
    {
        state: "Odisha",
        cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"]
    },
    {
        state: "Punjab",
        cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"]
    },
    {
        state: "Rajasthan",
        cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"]
    },
    {
        state: "Sikkim",
        cities: ["Gangtok", "Namchi", "Geyzing", "Mangan", "Rangpo"]
    },

    {
        state: "Telangana",
        cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"]
    },
    {
        state: "Tripura",
        cities: ["Agartala", "Udaipur", "Kailasahar", "Dharmanagar", "Belonia"]
    },
    {
        state: "Uttar Pradesh",
        cities: ["Lucknow", "Kanpur", "Ghaziabad", "Varanasi", "Agra"]
    },
    {
        state: "Uttarakhand",
        cities: ["Dehradun", "Haridwar", "Nainital", "Roorkee", "Haldwani"]
    },
    {
        state: "West Bengal",
        cities: ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah"]
    },
    {
        state: "Andaman and Nicobar Islands",
        cities: ["Port Blair", "Havelock Island", "Diglipur", "Mayabunder"]
    },
    {
        state: "Chandigarh",
        cities: ["Chandigarh"]
    },
    {
        state: "Dadra and Nagar Haveli and Daman and Diu",
        cities: ["Daman", "Diu", "Silvassa"]
    },
    {
        state: "Delhi",
        cities: ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh"]
    },
    {
        state: "Jammu and Kashmir",
        cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"]
    },
    {
        state: "Ladakh",
        cities: ["Leh", "Kargil"]
    },
    {
        state: "Lakshadweep",
        cities: ["Kavaratti", "Agatti", "Minicoy", "Amini"]
    },
    {
        state: "Puducherry",
        cities: ["Puducherry", "Karaikal", "Mahe", "Yanam"]
    }

];

export default indiaStateCities;
