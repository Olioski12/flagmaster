import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const FLAGS = [
  // ── Africa (54) ──
  { code: "DZ", name: "Algeria",                    emoji: "🇩🇿", region: "Africa" },
  { code: "AO", name: "Angola",                     emoji: "🇦🇴", region: "Africa" },
  { code: "BJ", name: "Benin",                      emoji: "🇧🇯", region: "Africa" },
  { code: "BW", name: "Botswana",                   emoji: "🇧🇼", region: "Africa" },
  { code: "BF", name: "Burkina Faso",               emoji: "🇧🇫", region: "Africa" },
  { code: "BI", name: "Burundi",                    emoji: "🇧🇮", region: "Africa" },
  { code: "CV", name: "Cape Verde",                 emoji: "🇨🇻", region: "Africa" },
  { code: "CM", name: "Cameroon",                   emoji: "🇨🇲", region: "Africa" },
  { code: "CF", name: "Central African Republic",   emoji: "🇨🇫", region: "Africa" },
  { code: "TD", name: "Chad",                       emoji: "🇹🇩", region: "Africa" },
  { code: "KM", name: "Comoros",                    emoji: "🇰🇲", region: "Africa" },
  { code: "CD", name: "DR Congo",                   emoji: "🇨🇩", region: "Africa" },
  { code: "CG", name: "Republic of Congo",          emoji: "🇨🇬", region: "Africa" },
  { code: "CI", name: "Ivory Coast",                emoji: "🇨🇮", region: "Africa" },
  { code: "DJ", name: "Djibouti",                   emoji: "🇩🇯", region: "Africa" },
  { code: "EG", name: "Egypt",                      emoji: "🇪🇬", region: "Africa" },
  { code: "GQ", name: "Equatorial Guinea",          emoji: "🇬🇶", region: "Africa" },
  { code: "ER", name: "Eritrea",                    emoji: "🇪🇷", region: "Africa" },
  { code: "SZ", name: "Eswatini",                   emoji: "🇸🇿", region: "Africa" },
  { code: "ET", name: "Ethiopia",                   emoji: "🇪🇹", region: "Africa" },
  { code: "GA", name: "Gabon",                      emoji: "🇬🇦", region: "Africa" },
  { code: "GM", name: "Gambia",                     emoji: "🇬🇲", region: "Africa" },
  { code: "GH", name: "Ghana",                      emoji: "🇬🇭", region: "Africa" },
  { code: "GN", name: "Guinea",                     emoji: "🇬🇳", region: "Africa" },
  { code: "GW", name: "Guinea-Bissau",              emoji: "🇬🇼", region: "Africa" },
  { code: "KE", name: "Kenya",                      emoji: "🇰🇪", region: "Africa" },
  { code: "LS", name: "Lesotho",                    emoji: "🇱🇸", region: "Africa" },
  { code: "LR", name: "Liberia",                    emoji: "🇱🇷", region: "Africa" },
  { code: "LY", name: "Libya",                      emoji: "🇱🇾", region: "Africa" },
  { code: "MG", name: "Madagascar",                 emoji: "🇲🇬", region: "Africa" },
  { code: "MW", name: "Malawi",                     emoji: "🇲🇼", region: "Africa" },
  { code: "ML", name: "Mali",                       emoji: "🇲🇱", region: "Africa" },
  { code: "MR", name: "Mauritania",                 emoji: "🇲🇷", region: "Africa" },
  { code: "MU", name: "Mauritius",                  emoji: "🇲🇺", region: "Africa" },
  { code: "MA", name: "Morocco",                    emoji: "🇲🇦", region: "Africa" },
  { code: "MZ", name: "Mozambique",                 emoji: "🇲🇿", region: "Africa" },
  { code: "NA", name: "Namibia",                    emoji: "🇳🇦", region: "Africa" },
  { code: "NE", name: "Niger",                      emoji: "🇳🇪", region: "Africa" },
  { code: "NG", name: "Nigeria",                    emoji: "🇳🇬", region: "Africa" },
  { code: "RW", name: "Rwanda",                     emoji: "🇷🇼", region: "Africa" },
  { code: "ST", name: "São Tomé and Príncipe",      emoji: "🇸🇹", region: "Africa" },
  { code: "SN", name: "Senegal",                    emoji: "🇸🇳", region: "Africa" },
  { code: "SC", name: "Seychelles",                 emoji: "🇸🇨", region: "Africa" },
  { code: "SL", name: "Sierra Leone",               emoji: "🇸🇱", region: "Africa" },
  { code: "SO", name: "Somalia",                    emoji: "🇸🇴", region: "Africa" },
  { code: "ZA", name: "South Africa",               emoji: "🇿🇦", region: "Africa" },
  { code: "SS", name: "South Sudan",                emoji: "🇸🇸", region: "Africa" },
  { code: "SD", name: "Sudan",                      emoji: "🇸🇩", region: "Africa" },
  { code: "TZ", name: "Tanzania",                   emoji: "🇹🇿", region: "Africa" },
  { code: "TG", name: "Togo",                       emoji: "🇹🇬", region: "Africa" },
  { code: "TN", name: "Tunisia",                    emoji: "🇹🇳", region: "Africa" },
  { code: "UG", name: "Uganda",                     emoji: "🇺🇬", region: "Africa" },
  { code: "ZM", name: "Zambia",                     emoji: "🇿🇲", region: "Africa" },
  { code: "ZW", name: "Zimbabwe",                   emoji: "🇿🇼", region: "Africa" },
  // ── Americas (35) ──
  { code: "AG", name: "Antigua and Barbuda",        emoji: "🇦🇬", region: "Americas" },
  { code: "AR", name: "Argentina",                  emoji: "🇦🇷", region: "Americas" },
  { code: "BS", name: "Bahamas",                    emoji: "🇧🇸", region: "Americas" },
  { code: "BB", name: "Barbados",                   emoji: "🇧🇧", region: "Americas" },
  { code: "BZ", name: "Belize",                     emoji: "🇧🇿", region: "Americas" },
  { code: "BO", name: "Bolivia",                    emoji: "🇧🇴", region: "Americas" },
  { code: "BR", name: "Brazil",                     emoji: "🇧🇷", region: "Americas" },
  { code: "CA", name: "Canada",                     emoji: "🇨🇦", region: "Americas" },
  { code: "CL", name: "Chile",                      emoji: "🇨🇱", region: "Americas" },
  { code: "CO", name: "Colombia",                   emoji: "🇨🇴", region: "Americas" },
  { code: "CR", name: "Costa Rica",                 emoji: "🇨🇷", region: "Americas" },
  { code: "CU", name: "Cuba",                       emoji: "🇨🇺", region: "Americas" },
  { code: "DM", name: "Dominica",                   emoji: "🇩🇲", region: "Americas" },
  { code: "DO", name: "Dominican Republic",         emoji: "🇩🇴", region: "Americas" },
  { code: "EC", name: "Ecuador",                    emoji: "🇪🇨", region: "Americas" },
  { code: "SV", name: "El Salvador",                emoji: "🇸🇻", region: "Americas" },
  { code: "GD", name: "Grenada",                    emoji: "🇬🇩", region: "Americas" },
  { code: "GT", name: "Guatemala",                  emoji: "🇬🇹", region: "Americas" },
  { code: "GY", name: "Guyana",                     emoji: "🇬🇾", region: "Americas" },
  { code: "HT", name: "Haiti",                      emoji: "🇭🇹", region: "Americas" },
  { code: "HN", name: "Honduras",                   emoji: "🇭🇳", region: "Americas" },
  { code: "JM", name: "Jamaica",                    emoji: "🇯🇲", region: "Americas" },
  { code: "MX", name: "Mexico",                     emoji: "🇲🇽", region: "Americas" },
  { code: "NI", name: "Nicaragua",                  emoji: "🇳🇮", region: "Americas" },
  { code: "PA", name: "Panama",                     emoji: "🇵🇦", region: "Americas" },
  { code: "PY", name: "Paraguay",                   emoji: "🇵🇾", region: "Americas" },
  { code: "PE", name: "Peru",                       emoji: "🇵🇪", region: "Americas" },
  { code: "KN", name: "Saint Kitts and Nevis",      emoji: "🇰🇳", region: "Americas" },
  { code: "LC", name: "Saint Lucia",                emoji: "🇱🇨", region: "Americas" },
  { code: "VC", name: "Saint Vincent and Grenadines", emoji: "🇻🇨", region: "Americas" },
  { code: "SR", name: "Suriname",                   emoji: "🇸🇷", region: "Americas" },
  { code: "TT", name: "Trinidad and Tobago",        emoji: "🇹🇹", region: "Americas" },
  { code: "US", name: "United States",              emoji: "🇺🇸", region: "Americas" },
  { code: "UY", name: "Uruguay",                    emoji: "🇺🇾", region: "Americas" },
  { code: "VE", name: "Venezuela",                  emoji: "🇻🇪", region: "Americas" },
  // ── Asia (49) ──
  { code: "AF", name: "Afghanistan",                emoji: "🇦🇫", region: "Asia" },
  { code: "AM", name: "Armenia",                    emoji: "🇦🇲", region: "Asia" },
  { code: "AZ", name: "Azerbaijan",                 emoji: "🇦🇿", region: "Asia" },
  { code: "BH", name: "Bahrain",                    emoji: "🇧🇭", region: "Asia" },
  { code: "BD", name: "Bangladesh",                 emoji: "🇧🇩", region: "Asia" },
  { code: "BT", name: "Bhutan",                     emoji: "🇧🇹", region: "Asia" },
  { code: "BN", name: "Brunei",                     emoji: "🇧🇳", region: "Asia" },
  { code: "KH", name: "Cambodia",                   emoji: "🇰🇭", region: "Asia" },
  { code: "CN", name: "China",                      emoji: "🇨🇳", region: "Asia" },
  { code: "CY", name: "Cyprus",                     emoji: "🇨🇾", region: "Asia" },
  { code: "GE", name: "Georgia",                    emoji: "🇬🇪", region: "Asia" },
  { code: "IN", name: "India",                      emoji: "🇮🇳", region: "Asia" },
  { code: "ID", name: "Indonesia",                  emoji: "🇮🇩", region: "Asia" },
  { code: "IR", name: "Iran",                       emoji: "🇮🇷", region: "Asia" },
  { code: "IQ", name: "Iraq",                       emoji: "🇮🇶", region: "Asia" },
  { code: "IL", name: "Israel",                     emoji: "🇮🇱", region: "Asia" },
  { code: "JP", name: "Japan",                      emoji: "🇯🇵", region: "Asia" },
  { code: "JO", name: "Jordan",                     emoji: "🇯🇴", region: "Asia" },
  { code: "KZ", name: "Kazakhstan",                 emoji: "🇰🇿", region: "Asia" },
  { code: "KW", name: "Kuwait",                     emoji: "🇰🇼", region: "Asia" },
  { code: "KG", name: "Kyrgyzstan",                 emoji: "🇰🇬", region: "Asia" },
  { code: "LA", name: "Laos",                       emoji: "🇱🇦", region: "Asia" },
  { code: "LB", name: "Lebanon",                    emoji: "🇱🇧", region: "Asia" },
  { code: "MY", name: "Malaysia",                   emoji: "🇲🇾", region: "Asia" },
  { code: "MV", name: "Maldives",                   emoji: "🇲🇻", region: "Asia" },
  { code: "MN", name: "Mongolia",                   emoji: "🇲🇳", region: "Asia" },
  { code: "MM", name: "Myanmar",                    emoji: "🇲🇲", region: "Asia" },
  { code: "NP", name: "Nepal",                      emoji: "🇳🇵", region: "Asia" },
  { code: "KP", name: "North Korea",                emoji: "🇰🇵", region: "Asia" },
  { code: "OM", name: "Oman",                       emoji: "🇴🇲", region: "Asia" },
  { code: "PK", name: "Pakistan",                   emoji: "🇵🇰", region: "Asia" },
  { code: "PS", name: "Palestine",                  emoji: "🇵🇸", region: "Asia" },
  { code: "PH", name: "Philippines",                emoji: "🇵🇭", region: "Asia" },
  { code: "QA", name: "Qatar",                      emoji: "🇶🇦", region: "Asia" },
  { code: "SA", name: "Saudi Arabia",               emoji: "🇸🇦", region: "Asia" },
  { code: "SG", name: "Singapore",                  emoji: "🇸🇬", region: "Asia" },
  { code: "KR", name: "South Korea",                emoji: "🇰🇷", region: "Asia" },
  { code: "LK", name: "Sri Lanka",                  emoji: "🇱🇰", region: "Asia" },
  { code: "SY", name: "Syria",                      emoji: "🇸🇾", region: "Asia" },
  { code: "TW", name: "Taiwan",                     emoji: "🇹🇼", region: "Asia" },
  { code: "TJ", name: "Tajikistan",                 emoji: "🇹🇯", region: "Asia" },
  { code: "TH", name: "Thailand",                   emoji: "🇹🇭", region: "Asia" },
  { code: "TL", name: "Timor-Leste",                emoji: "🇹🇱", region: "Asia" },
  { code: "TR", name: "Turkey",                     emoji: "🇹🇷", region: "Asia" },
  { code: "TM", name: "Turkmenistan",               emoji: "🇹🇲", region: "Asia" },
  { code: "AE", name: "UAE",                        emoji: "🇦🇪", region: "Asia" },
  { code: "UZ", name: "Uzbekistan",                 emoji: "🇺🇿", region: "Asia" },
  { code: "VN", name: "Vietnam",                    emoji: "🇻🇳", region: "Asia" },
  { code: "YE", name: "Yemen",                      emoji: "🇾🇪", region: "Asia" },
  // ── Europe (44) ──
  { code: "AL", name: "Albania",                    emoji: "🇦🇱", region: "Europe" },
  { code: "AD", name: "Andorra",                    emoji: "🇦🇩", region: "Europe" },
  { code: "AT", name: "Austria",                    emoji: "🇦🇹", region: "Europe" },
  { code: "BY", name: "Belarus",                    emoji: "🇧🇾", region: "Europe" },
  { code: "BE", name: "Belgium",                    emoji: "🇧🇪", region: "Europe" },
  { code: "BA", name: "Bosnia and Herzegovina",     emoji: "🇧🇦", region: "Europe" },
  { code: "BG", name: "Bulgaria",                   emoji: "🇧🇬", region: "Europe" },
  { code: "HR", name: "Croatia",                    emoji: "🇭🇷", region: "Europe" },
  { code: "CZ", name: "Czech Republic",             emoji: "🇨🇿", region: "Europe" },
  { code: "DK", name: "Denmark",                    emoji: "🇩🇰", region: "Europe" },
  { code: "EE", name: "Estonia",                    emoji: "🇪🇪", region: "Europe" },
  { code: "FI", name: "Finland",                    emoji: "🇫🇮", region: "Europe" },
  { code: "FR", name: "France",                     emoji: "🇫🇷", region: "Europe" },
  { code: "DE", name: "Germany",                    emoji: "🇩🇪", region: "Europe" },
  { code: "GR", name: "Greece",                     emoji: "🇬🇷", region: "Europe" },
  { code: "HU", name: "Hungary",                    emoji: "🇭🇺", region: "Europe" },
  { code: "IS", name: "Iceland",                    emoji: "🇮🇸", region: "Europe" },
  { code: "IE", name: "Ireland",                    emoji: "🇮🇪", region: "Europe" },
  { code: "IT", name: "Italy",                      emoji: "🇮🇹", region: "Europe" },
  { code: "XK", name: "Kosovo",                     emoji: "🇽🇰", region: "Europe" },
  { code: "LV", name: "Latvia",                     emoji: "🇱🇻", region: "Europe" },
  { code: "LI", name: "Liechtenstein",              emoji: "🇱🇮", region: "Europe" },
  { code: "LT", name: "Lithuania",                  emoji: "🇱🇹", region: "Europe" },
  { code: "LU", name: "Luxembourg",                 emoji: "🇱🇺", region: "Europe" },
  { code: "MT", name: "Malta",                      emoji: "🇲🇹", region: "Europe" },
  { code: "MD", name: "Moldova",                    emoji: "🇲🇩", region: "Europe" },
  { code: "MC", name: "Monaco",                     emoji: "🇲🇨", region: "Europe" },
  { code: "ME", name: "Montenegro",                 emoji: "🇲🇪", region: "Europe" },
  { code: "NL", name: "Netherlands",                emoji: "🇳🇱", region: "Europe" },
  { code: "MK", name: "North Macedonia",            emoji: "🇲🇰", region: "Europe" },
  { code: "NO", name: "Norway",                     emoji: "🇳🇴", region: "Europe" },
  { code: "PL", name: "Poland",                     emoji: "🇵🇱", region: "Europe" },
  { code: "PT", name: "Portugal",                   emoji: "🇵🇹", region: "Europe" },
  { code: "RO", name: "Romania",                    emoji: "🇷🇴", region: "Europe" },
  { code: "RU", name: "Russia",                     emoji: "🇷🇺", region: "Europe" },
  { code: "SM", name: "San Marino",                 emoji: "🇸🇲", region: "Europe" },
  { code: "RS", name: "Serbia",                     emoji: "🇷🇸", region: "Europe" },
  { code: "SK", name: "Slovakia",                   emoji: "🇸🇰", region: "Europe" },
  { code: "SI", name: "Slovenia",                   emoji: "🇸🇮", region: "Europe" },
  { code: "ES", name: "Spain",                      emoji: "🇪🇸", region: "Europe" },
  { code: "SE", name: "Sweden",                     emoji: "🇸🇪", region: "Europe" },
  { code: "CH", name: "Switzerland",                emoji: "🇨🇭", region: "Europe" },
  { code: "UA", name: "Ukraine",                    emoji: "🇺🇦", region: "Europe" },
  { code: "GB", name: "United Kingdom",             emoji: "🇬🇧", region: "Europe" },
  // ── Oceania (14) ──
  { code: "AU", name: "Australia",                  emoji: "🇦🇺", region: "Oceania" },
  { code: "FJ", name: "Fiji",                       emoji: "🇫🇯", region: "Oceania" },
  { code: "KI", name: "Kiribati",                   emoji: "🇰🇮", region: "Oceania" },
  { code: "MH", name: "Marshall Islands",           emoji: "🇲🇭", region: "Oceania" },
  { code: "FM", name: "Micronesia",                 emoji: "🇫🇲", region: "Oceania" },
  { code: "NR", name: "Nauru",                      emoji: "🇳🇷", region: "Oceania" },
  { code: "NZ", name: "New Zealand",                emoji: "🇳🇿", region: "Oceania" },
  { code: "PW", name: "Palau",                      emoji: "🇵🇼", region: "Oceania" },
  { code: "PG", name: "Papua New Guinea",           emoji: "🇵🇬", region: "Oceania" },
  { code: "WS", name: "Samoa",                      emoji: "🇼🇸", region: "Oceania" },
  { code: "SB", name: "Solomon Islands",            emoji: "🇸🇧", region: "Oceania" },
  { code: "TO", name: "Tonga",                      emoji: "🇹🇴", region: "Oceania" },
  { code: "TV", name: "Tuvalu",                     emoji: "🇹🇻", region: "Oceania" },
  { code: "VU", name: "Vanuatu",                    emoji: "🇻🇺", region: "Oceania" },
];

// ─── CAPITALS DATA ────────────────────────────────────────────────────────────
const CAPITALS = [
  // ── Africa ──
  { country: "Algeria",                  capital: "Algiers",                    emoji: "🇩🇿", region: "Africa" },
  { country: "Angola",                   capital: "Luanda",                     emoji: "🇦🇴", region: "Africa" },
  { country: "Benin",                    capital: "Porto-Novo",                 emoji: "🇧🇯", region: "Africa" },
  { country: "Botswana",                 capital: "Gaborone",                   emoji: "🇧🇼", region: "Africa" },
  { country: "Burkina Faso",             capital: "Ouagadougou",                emoji: "🇧🇫", region: "Africa" },
  { country: "Burundi",                  capital: "Gitega",                     emoji: "🇧🇮", region: "Africa" },
  { country: "Cape Verde",               capital: "Praia",                      emoji: "🇨🇻", region: "Africa" },
  { country: "Cameroon",                 capital: "Yaoundé",                    emoji: "🇨🇲", region: "Africa" },
  { country: "Central African Republic", capital: "Bangui",                     emoji: "🇨🇫", region: "Africa" },
  { country: "Chad",                     capital: "N'Djamena",                  emoji: "🇹🇩", region: "Africa" },
  { country: "Comoros",                  capital: "Moroni",                     emoji: "🇰🇲", region: "Africa" },
  { country: "DR Congo",                 capital: "Kinshasa",                   emoji: "🇨🇩", region: "Africa" },
  { country: "Republic of Congo",        capital: "Brazzaville",                emoji: "🇨🇬", region: "Africa" },
  { country: "Ivory Coast",             capital: "Yamoussoukro",               emoji: "🇨🇮", region: "Africa" },
  { country: "Djibouti",                 capital: "Djibouti City",              emoji: "🇩🇯", region: "Africa" },
  { country: "Egypt",                    capital: "Cairo",                      emoji: "🇪🇬", region: "Africa" },
  { country: "Equatorial Guinea",        capital: "Malabo",                     emoji: "🇬🇶", region: "Africa" },
  { country: "Eritrea",                  capital: "Asmara",                     emoji: "🇪🇷", region: "Africa" },
  { country: "Eswatini",                 capital: "Mbabane",                    emoji: "🇸🇿", region: "Africa" },
  { country: "Ethiopia",                 capital: "Addis Ababa",                emoji: "🇪🇹", region: "Africa" },
  { country: "Gabon",                    capital: "Libreville",                 emoji: "🇬🇦", region: "Africa" },
  { country: "Gambia",                   capital: "Banjul",                     emoji: "🇬🇲", region: "Africa" },
  { country: "Ghana",                    capital: "Accra",                      emoji: "🇬🇭", region: "Africa" },
  { country: "Guinea",                   capital: "Conakry",                    emoji: "🇬🇳", region: "Africa" },
  { country: "Guinea-Bissau",            capital: "Bissau",                     emoji: "🇬🇼", region: "Africa" },
  { country: "Kenya",                    capital: "Nairobi",                    emoji: "🇰🇪", region: "Africa" },
  { country: "Lesotho",                  capital: "Maseru",                     emoji: "🇱🇸", region: "Africa" },
  { country: "Liberia",                  capital: "Monrovia",                   emoji: "🇱🇷", region: "Africa" },
  { country: "Libya",                    capital: "Tripoli",                    emoji: "🇱🇾", region: "Africa" },
  { country: "Madagascar",               capital: "Antananarivo",               emoji: "🇲🇬", region: "Africa" },
  { country: "Malawi",                   capital: "Lilongwe",                   emoji: "🇲🇼", region: "Africa" },
  { country: "Mali",                     capital: "Bamako",                     emoji: "🇲🇱", region: "Africa" },
  { country: "Mauritania",               capital: "Nouakchott",                 emoji: "🇲🇷", region: "Africa" },
  { country: "Mauritius",                capital: "Port Louis",                 emoji: "🇲🇺", region: "Africa" },
  { country: "Morocco",                  capital: "Rabat",                      emoji: "🇲🇦", region: "Africa" },
  { country: "Mozambique",               capital: "Maputo",                     emoji: "🇲🇿", region: "Africa" },
  { country: "Namibia",                  capital: "Windhoek",                   emoji: "🇳🇦", region: "Africa" },
  { country: "Niger",                    capital: "Niamey",                     emoji: "🇳🇪", region: "Africa" },
  { country: "Nigeria",                  capital: "Abuja",                      emoji: "🇳🇬", region: "Africa" },
  { country: "Rwanda",                   capital: "Kigali",                     emoji: "🇷🇼", region: "Africa" },
  { country: "São Tomé and Príncipe",    capital: "São Tomé",                   emoji: "🇸🇹", region: "Africa" },
  { country: "Senegal",                  capital: "Dakar",                      emoji: "🇸🇳", region: "Africa" },
  { country: "Seychelles",               capital: "Victoria",                   emoji: "🇸🇨", region: "Africa" },
  { country: "Sierra Leone",             capital: "Freetown",                   emoji: "🇸🇱", region: "Africa" },
  { country: "Somalia",                  capital: "Mogadishu",                  emoji: "🇸🇴", region: "Africa" },
  { country: "South Africa",             capital: "Pretoria / Cape Town / Bloemfontein", emoji: "🇿🇦", region: "Africa" },
  { country: "South Sudan",              capital: "Juba",                       emoji: "🇸🇸", region: "Africa" },
  { country: "Sudan",                    capital: "Khartoum",                   emoji: "🇸🇩", region: "Africa" },
  { country: "Tanzania",                 capital: "Dodoma",                     emoji: "🇹🇿", region: "Africa" },
  { country: "Togo",                     capital: "Lomé",                       emoji: "🇹🇬", region: "Africa" },
  { country: "Tunisia",                  capital: "Tunis",                      emoji: "🇹🇳", region: "Africa" },
  { country: "Uganda",                   capital: "Kampala",                    emoji: "🇺🇬", region: "Africa" },
  { country: "Zambia",                   capital: "Lusaka",                     emoji: "🇿🇲", region: "Africa" },
  { country: "Zimbabwe",                 capital: "Harare",                     emoji: "🇿🇼", region: "Africa" },
  // ── Americas ──
  { country: "Antigua and Barbuda",      capital: "Saint John's",               emoji: "🇦🇬", region: "Americas" },
  { country: "Argentina",                capital: "Buenos Aires",               emoji: "🇦🇷", region: "Americas" },
  { country: "Bahamas",                  capital: "Nassau",                     emoji: "🇧🇸", region: "Americas" },
  { country: "Barbados",                 capital: "Bridgetown",                 emoji: "🇧🇧", region: "Americas" },
  { country: "Belize",                   capital: "Belmopan",                   emoji: "🇧🇿", region: "Americas" },
  { country: "Bolivia",                  capital: "Sucre / La Paz",             emoji: "🇧🇴", region: "Americas" },
  { country: "Brazil",                   capital: "Brasília",                   emoji: "🇧🇷", region: "Americas" },
  { country: "Canada",                   capital: "Ottawa",                     emoji: "🇨🇦", region: "Americas" },
  { country: "Chile",                    capital: "Santiago",                   emoji: "🇨🇱", region: "Americas" },
  { country: "Colombia",                 capital: "Bogotá",                     emoji: "🇨🇴", region: "Americas" },
  { country: "Costa Rica",               capital: "San José",                   emoji: "🇨🇷", region: "Americas" },
  { country: "Cuba",                     capital: "Havana",                     emoji: "🇨🇺", region: "Americas" },
  { country: "Dominica",                 capital: "Roseau",                     emoji: "🇩🇲", region: "Americas" },
  { country: "Dominican Republic",       capital: "Santo Domingo",              emoji: "🇩🇴", region: "Americas" },
  { country: "Ecuador",                  capital: "Quito",                      emoji: "🇪🇨", region: "Americas" },
  { country: "El Salvador",              capital: "San Salvador",               emoji: "🇸🇻", region: "Americas" },
  { country: "Grenada",                  capital: "Saint George's",             emoji: "🇬🇩", region: "Americas" },
  { country: "Guatemala",                capital: "Guatemala City",             emoji: "🇬🇹", region: "Americas" },
  { country: "Guyana",                   capital: "Georgetown",                 emoji: "🇬🇾", region: "Americas" },
  { country: "Haiti",                    capital: "Port-au-Prince",             emoji: "🇭🇹", region: "Americas" },
  { country: "Honduras",                 capital: "Tegucigalpa",                emoji: "🇭🇳", region: "Americas" },
  { country: "Jamaica",                  capital: "Kingston",                   emoji: "🇯🇲", region: "Americas" },
  { country: "Mexico",                   capital: "Mexico City",                emoji: "🇲🇽", region: "Americas" },
  { country: "Nicaragua",                capital: "Managua",                    emoji: "🇳🇮", region: "Americas" },
  { country: "Panama",                   capital: "Panama City",                emoji: "🇵🇦", region: "Americas" },
  { country: "Paraguay",                 capital: "Asunción",                   emoji: "🇵🇾", region: "Americas" },
  { country: "Peru",                     capital: "Lima",                       emoji: "🇵🇪", region: "Americas" },
  { country: "Saint Kitts and Nevis",    capital: "Basseterre",                 emoji: "🇰🇳", region: "Americas" },
  { country: "Saint Lucia",              capital: "Castries",                   emoji: "🇱🇨", region: "Americas" },
  { country: "Saint Vincent and Grenadines", capital: "Kingstown",              emoji: "🇻🇨", region: "Americas" },
  { country: "Suriname",                 capital: "Paramaribo",                 emoji: "🇸🇷", region: "Americas" },
  { country: "Trinidad and Tobago",      capital: "Port of Spain",              emoji: "🇹🇹", region: "Americas" },
  { country: "United States",            capital: "Washington D.C.",            emoji: "🇺🇸", region: "Americas" },
  { country: "Uruguay",                  capital: "Montevideo",                 emoji: "🇺🇾", region: "Americas" },
  { country: "Venezuela",                capital: "Caracas",                    emoji: "🇻🇪", region: "Americas" },
  // ── Asia ──
  { country: "Afghanistan",              capital: "Kabul",                      emoji: "🇦🇫", region: "Asia" },
  { country: "Armenia",                  capital: "Yerevan",                    emoji: "🇦🇲", region: "Asia" },
  { country: "Azerbaijan",               capital: "Baku",                       emoji: "🇦🇿", region: "Asia" },
  { country: "Bahrain",                  capital: "Manama",                     emoji: "🇧🇭", region: "Asia" },
  { country: "Bangladesh",               capital: "Dhaka",                      emoji: "🇧🇩", region: "Asia" },
  { country: "Bhutan",                   capital: "Thimphu",                    emoji: "🇧🇹", region: "Asia" },
  { country: "Brunei",                   capital: "Bandar Seri Begawan",        emoji: "🇧🇳", region: "Asia" },
  { country: "Cambodia",                 capital: "Phnom Penh",                 emoji: "🇰🇭", region: "Asia" },
  { country: "China",                    capital: "Beijing",                    emoji: "🇨🇳", region: "Asia" },
  { country: "Cyprus",                   capital: "Nicosia",                    emoji: "🇨🇾", region: "Asia" },
  { country: "Georgia",                  capital: "Tbilisi",                    emoji: "🇬🇪", region: "Asia" },
  { country: "India",                    capital: "New Delhi",                  emoji: "🇮🇳", region: "Asia" },
  { country: "Indonesia",                capital: "Jakarta",                    emoji: "🇮🇩", region: "Asia" },
  { country: "Iran",                     capital: "Tehran",                     emoji: "🇮🇷", region: "Asia" },
  { country: "Iraq",                     capital: "Baghdad",                    emoji: "🇮🇶", region: "Asia" },
  { country: "Israel",                   capital: "Jerusalem",                  emoji: "🇮🇱", region: "Asia" },
  { country: "Japan",                    capital: "Tokyo",                      emoji: "🇯🇵", region: "Asia" },
  { country: "Jordan",                   capital: "Amman",                      emoji: "🇯🇴", region: "Asia" },
  { country: "Kazakhstan",               capital: "Astana",                     emoji: "🇰🇿", region: "Asia" },
  { country: "Kuwait",                   capital: "Kuwait City",                emoji: "🇰🇼", region: "Asia" },
  { country: "Kyrgyzstan",               capital: "Bishkek",                    emoji: "🇰🇬", region: "Asia" },
  { country: "Laos",                     capital: "Vientiane",                  emoji: "🇱🇦", region: "Asia" },
  { country: "Lebanon",                  capital: "Beirut",                     emoji: "🇱🇧", region: "Asia" },
  { country: "Malaysia",                 capital: "Kuala Lumpur",               emoji: "🇲🇾", region: "Asia" },
  { country: "Maldives",                 capital: "Malé",                       emoji: "🇲🇻", region: "Asia" },
  { country: "Mongolia",                 capital: "Ulaanbaatar",                emoji: "🇲🇳", region: "Asia" },
  { country: "Myanmar",                  capital: "Naypyidaw",                  emoji: "🇲🇲", region: "Asia" },
  { country: "Nepal",                    capital: "Kathmandu",                  emoji: "🇳🇵", region: "Asia" },
  { country: "North Korea",              capital: "Pyongyang",                  emoji: "🇰🇵", region: "Asia" },
  { country: "Oman",                     capital: "Muscat",                     emoji: "🇴🇲", region: "Asia" },
  { country: "Pakistan",                 capital: "Islamabad",                  emoji: "🇵🇰", region: "Asia" },
  { country: "Palestine",                capital: "Ramallah",                   emoji: "🇵🇸", region: "Asia" },
  { country: "Philippines",              capital: "Manila",                     emoji: "🇵🇭", region: "Asia" },
  { country: "Qatar",                    capital: "Doha",                       emoji: "🇶🇦", region: "Asia" },
  { country: "Saudi Arabia",             capital: "Riyadh",                     emoji: "🇸🇦", region: "Asia" },
  { country: "Singapore",                capital: "Singapore",                  emoji: "🇸🇬", region: "Asia" },
  { country: "South Korea",              capital: "Seoul",                      emoji: "🇰🇷", region: "Asia" },
  { country: "Sri Lanka",                capital: "Sri Jayawardenepura Kotte",  emoji: "🇱🇰", region: "Asia" },
  { country: "Syria",                    capital: "Damascus",                   emoji: "🇸🇾", region: "Asia" },
  { country: "Taiwan",                   capital: "Taipei",                     emoji: "🇹🇼", region: "Asia" },
  { country: "Tajikistan",               capital: "Dushanbe",                   emoji: "🇹🇯", region: "Asia" },
  { country: "Thailand",                 capital: "Bangkok",                    emoji: "🇹🇭", region: "Asia" },
  { country: "Timor-Leste",              capital: "Dili",                       emoji: "🇹🇱", region: "Asia" },
  { country: "Turkey",                   capital: "Ankara",                     emoji: "🇹🇷", region: "Asia" },
  { country: "Turkmenistan",             capital: "Ashgabat",                   emoji: "🇹🇲", region: "Asia" },
  { country: "UAE",                      capital: "Abu Dhabi",                  emoji: "🇦🇪", region: "Asia" },
  { country: "Uzbekistan",               capital: "Tashkent",                   emoji: "🇺🇿", region: "Asia" },
  { country: "Vietnam",                  capital: "Hanoi",                      emoji: "🇻🇳", region: "Asia" },
  { country: "Yemen",                    capital: "Sanaa",                      emoji: "🇾🇪", region: "Asia" },
  // ── Europe ──
  { country: "Albania",                  capital: "Tirana",                     emoji: "🇦🇱", region: "Europe" },
  { country: "Andorra",                  capital: "Andorra la Vella",           emoji: "🇦🇩", region: "Europe" },
  { country: "Austria",                  capital: "Vienna",                     emoji: "🇦🇹", region: "Europe" },
  { country: "Belarus",                  capital: "Minsk",                      emoji: "🇧🇾", region: "Europe" },
  { country: "Belgium",                  capital: "Brussels",                   emoji: "🇧🇪", region: "Europe" },
  { country: "Bosnia and Herzegovina",   capital: "Sarajevo",                   emoji: "🇧🇦", region: "Europe" },
  { country: "Bulgaria",                 capital: "Sofia",                      emoji: "🇧🇬", region: "Europe" },
  { country: "Croatia",                  capital: "Zagreb",                     emoji: "🇭🇷", region: "Europe" },
  { country: "Czech Republic",           capital: "Prague",                     emoji: "🇨🇿", region: "Europe" },
  { country: "Denmark",                  capital: "Copenhagen",                 emoji: "🇩🇰", region: "Europe" },
  { country: "Estonia",                  capital: "Tallinn",                    emoji: "🇪🇪", region: "Europe" },
  { country: "Finland",                  capital: "Helsinki",                   emoji: "🇫🇮", region: "Europe" },
  { country: "France",                   capital: "Paris",                      emoji: "🇫🇷", region: "Europe" },
  { country: "Germany",                  capital: "Berlin",                     emoji: "🇩🇪", region: "Europe" },
  { country: "Greece",                   capital: "Athens",                     emoji: "🇬🇷", region: "Europe" },
  { country: "Hungary",                  capital: "Budapest",                   emoji: "🇭🇺", region: "Europe" },
  { country: "Iceland",                  capital: "Reykjavik",                  emoji: "🇮🇸", region: "Europe" },
  { country: "Ireland",                  capital: "Dublin",                     emoji: "🇮🇪", region: "Europe" },
  { country: "Italy",                    capital: "Rome",                       emoji: "🇮🇹", region: "Europe" },
  { country: "Kosovo",                   capital: "Pristina",                   emoji: "🇽🇰", region: "Europe" },
  { country: "Latvia",                   capital: "Riga",                       emoji: "🇱🇻", region: "Europe" },
  { country: "Liechtenstein",            capital: "Vaduz",                      emoji: "🇱🇮", region: "Europe" },
  { country: "Lithuania",                capital: "Vilnius",                    emoji: "🇱🇹", region: "Europe" },
  { country: "Luxembourg",               capital: "Luxembourg City",            emoji: "🇱🇺", region: "Europe" },
  { country: "Malta",                    capital: "Valletta",                   emoji: "🇲🇹", region: "Europe" },
  { country: "Moldova",                  capital: "Chișinău",                   emoji: "🇲🇩", region: "Europe" },
  { country: "Monaco",                   capital: "Monaco",                     emoji: "🇲🇨", region: "Europe" },
  { country: "Montenegro",               capital: "Podgorica",                  emoji: "🇲🇪", region: "Europe" },
  { country: "Netherlands",              capital: "Amsterdam",                  emoji: "🇳🇱", region: "Europe" },
  { country: "North Macedonia",          capital: "Skopje",                     emoji: "🇲🇰", region: "Europe" },
  { country: "Norway",                   capital: "Oslo",                       emoji: "🇳🇴", region: "Europe" },
  { country: "Poland",                   capital: "Warsaw",                     emoji: "🇵🇱", region: "Europe" },
  { country: "Portugal",                 capital: "Lisbon",                     emoji: "🇵🇹", region: "Europe" },
  { country: "Romania",                  capital: "Bucharest",                  emoji: "🇷🇴", region: "Europe" },
  { country: "Russia",                   capital: "Moscow",                     emoji: "🇷🇺", region: "Europe" },
  { country: "San Marino",               capital: "San Marino City",            emoji: "🇸🇲", region: "Europe" },
  { country: "Serbia",                   capital: "Belgrade",                   emoji: "🇷🇸", region: "Europe" },
  { country: "Slovakia",                 capital: "Bratislava",                 emoji: "🇸🇰", region: "Europe" },
  { country: "Slovenia",                 capital: "Ljubljana",                  emoji: "🇸🇮", region: "Europe" },
  { country: "Spain",                    capital: "Madrid",                     emoji: "🇪🇸", region: "Europe" },
  { country: "Sweden",                   capital: "Stockholm",                  emoji: "🇸🇪", region: "Europe" },
  { country: "Switzerland",              capital: "Bern",                       emoji: "🇨🇭", region: "Europe" },
  { country: "Ukraine",                  capital: "Kyiv",                       emoji: "🇺🇦", region: "Europe" },
  { country: "United Kingdom",           capital: "London",                     emoji: "🇬🇧", region: "Europe" },
  // ── Oceania ──
  { country: "Australia",                capital: "Canberra",                   emoji: "🇦🇺", region: "Oceania" },
  { country: "Fiji",                     capital: "Suva",                       emoji: "🇫🇯", region: "Oceania" },
  { country: "Kiribati",                 capital: "South Tarawa",               emoji: "🇰🇮", region: "Oceania" },
  { country: "Marshall Islands",         capital: "Majuro",                     emoji: "🇲🇭", region: "Oceania" },
  { country: "Micronesia",               capital: "Palikir",                    emoji: "🇫🇲", region: "Oceania" },
  { country: "Nauru",                    capital: "Yaren",                      emoji: "🇳🇷", region: "Oceania" },
  { country: "New Zealand",              capital: "Wellington",                 emoji: "🇳🇿", region: "Oceania" },
  { country: "Palau",                    capital: "Ngerulmud",                  emoji: "🇵🇼", region: "Oceania" },
  { country: "Papua New Guinea",         capital: "Port Moresby",               emoji: "🇵🇬", region: "Oceania" },
  { country: "Samoa",                    capital: "Apia",                       emoji: "🇼🇸", region: "Oceania" },
  { country: "Solomon Islands",          capital: "Honiara",                    emoji: "🇸🇧", region: "Oceania" },
  { country: "Tonga",                    capital: "Nuku'alofa",                 emoji: "🇹🇴", region: "Oceania" },
  { country: "Tuvalu",                   capital: "Funafuti",                   emoji: "🇹🇻", region: "Oceania" },
  { country: "Vanuatu",                  capital: "Port Vila",                  emoji: "🇻🇺", region: "Oceania" },
];


const XP_RANKS = [
  { name: "Novice",       minXP: 0,    color: "#9ca3af", icon: "🌱" },
  { name: "Explorer",     minXP: 100,  color: "#60a5fa", icon: "🗺️" },
  { name: "Traveler",     minXP: 300,  color: "#34d399", icon: "✈️" },
  { name: "Geographer",   minXP: 700,  color: "#fbbf24", icon: "🌍" },
  { name: "Ambassador",   minXP: 1500, color: "#f97316", icon: "🎖️" },
  { name: "World Master", minXP: 3000, color: "#a855f7", icon: "👑" },
];


const GAME_MODES = [
  { id: "solo-mc",       label: "Flags Quiz",      sub: "See flag → name country",  icon: "🧠", color: "#6366f1", tag: "SOLO", category: "flags"    },
  { id: "flag-pick",      label: "Flag Picker",     sub: "See country → pick flag",   icon: "🏳️", color: "#0ea5e9", tag: "SOLO", category: "flags"    },
  { id: "solo-type",     label: "Flags Typing",    sub: "Type the country",      icon: "⌨️", color: "#06b6d4", tag: "SOLO", category: "flags"    },
  { id: "flashcard",     label: "Flashcards",      sub: "Flip & learn",          icon: "📚", color: "#10b981", tag: "SOLO", category: "flags"    },
  { id: "speed",         label: "Speed Run",       sub: "30-second blitz",       icon: "⚡", color: "#f59e0b", tag: "SOLO", category: "flags"    },
  { id: "capitals-mc",   label: "Capitals Quiz",   sub: "Name the capital city", icon: "🗺️", color: "#8b5cf6", tag: "SOLO", category: "capitals" },
  { id: "capitals-type", label: "Capitals Typing", sub: "Type the capital",      icon: "✏️", color: "#a855f7", tag: "SOLO", category: "capitals" },
  { id: "tournament",    label: "Tournament",      sub: "8-player bracket",      icon: "🏆", color: "#64748b", tag: "SOON", category: "flags"    },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }


function getXPRank(xp) {
  return [...XP_RANKS].reverse().find(r => xp >= r.minXP) || XP_RANKS[0];
}


function normalize(str) {
  return str.toLowerCase().trim().replace(/[^a-z]/g, "");
}

function isCorrectTyping(input, answer) {
  const n = normalize(input);
  const a = normalize(answer);
  if (n === a) return true;
  if (a.length > 6) {
    let diff = 0;
    for (let i = 0; i < Math.max(n.length, a.length); i++) {
      if (n[i] !== a[i]) diff++;
    }
    return diff <= 1 && Math.abs(n.length - a.length) <= 1;
  }
  return false;
}

// ─── STORAGE (localStorage) ───────────────────────────────────────────────────
const DEFAULT_PROFILE = {
  username: null,
  avatar: "😎",
  homeCountry: null,  // country code e.g. "AU"
  xp: 0,
  gamesPlayed: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  streak: 0,
  lastPlayed: null,
  history: [],
  dailyStreak: 0,
  lastStreakDate: null,   // "YYYY-MM-DD" of last streak-qualifying day
  todayXP: 0,             // XP earned today (resets each calendar day)
  DAILY_STREAK_XP: 30,    // XP needed in a single day to count toward streak
  // knowledge[category][itemId] = { correct, wrong, lastSeen, confusedWith: {id: count} }
  knowledge: { flags: {}, capitals: {} },
};

function loadProfile() {
  try {
    const raw = localStorage.getItem("flagmaster_profile");
    return raw ? JSON.parse(raw) : { ...DEFAULT_PROFILE };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

function saveProfile(p) {
  try {
    localStorage.setItem("flagmaster_profile", JSON.stringify(p));
  } catch {}
}

function resetProfileStorage() {
  localStorage.removeItem("flagmaster_profile");
}

// ─── FLAG IMAGE ───────────────────────────────────────────────────────────────
// Renders flag emoji at large sizes — works offline, no CDN needed.
// Emoji flags look great on all modern operating systems.
function FlagImg({ code, size = 200 }) {
  const [failed, setFailed] = useState(false);
  const flag = FLAGS.find(f => f.code === code);
  const emoji = flag?.emoji ?? "🏳️";
  const isSmall = size <= 100;

  // flagcdn.com provides free, reliable flag images by ISO 2-letter code (lowercase)
  // Width param: use 2x pixel density for sharpness
  const imgW = isSmall ? 80 : 320;
  const src = `https://flagcdn.com/w${imgW}/${code.toLowerCase()}.png`;

  const imgStyle = isSmall ? {
    width: size,
    height: Math.round(size * 0.72),
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.08)",
    display: "block",
  } : {
    width: Math.min(size, 280),
    height: "auto",
    maxHeight: Math.round(Math.min(size, 280) * 0.67),
    objectFit: "contain",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    display: "block",
  };

  if (failed) {
    // Fallback: emoji in a card (for systems with emoji flag support)
    const fontSize = isSmall ? Math.round(size * 0.55) : 80;
    return (
      <div style={{
        width: isSmall ? size : Math.min(size, 280),
        height: isSmall ? Math.round(size * 0.72) : Math.round(Math.min(size, 280) * 0.67),
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,0.04)", borderRadius: isSmall ? 8 : 10,
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <span style={{ fontSize, lineHeight: 1 }}>{emoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={flag?.name ?? code}
      style={imgStyle}
      onError={() => setFailed(true)}
    />
  );
}


// ─── FLAG ICON (small inline use: profile header, learn page) ──────────────────
// Uses flagcdn.com just like FlagImg but sized for UI chrome (20-32px height)
function FlagIcon({ code, height = 24 }) {
  const [failed, setFailed] = useState(false);
  const flag = FLAGS.find(f => f.code === code);
  if (!code) return null;
  if (failed) {
    return <span style={{ fontSize: height * 0.9, lineHeight: 1 }}>{flag?.emoji ?? "🏳️"}</span>;
  }
  return (
    <img
      src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
      alt={flag?.name ?? code}
      onError={() => setFailed(true)}
      style={{ height, width: "auto", borderRadius: 3, verticalAlign: "middle", display: "inline-block", border: "1px solid rgba(255,255,255,0.12)" }}
    />
  );
}

// ─── SHARED SUBCOMPONENTS ────────────────────────────────────────────────────

function GameShell({ children, hud, progress, onExit }) {
  return (
    <div style={S.gameWrap}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 10px" }}>
        <button onClick={onExit} style={S.backBtn}>← Back</button>
        {hud}
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4, marginBottom: 24, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min(100, progress * 100)}%`, background: "linear-gradient(90deg,#6366f1,#a78bfa)", borderRadius: 4, transition: "width 0.3s" }} />
      </div>
      {children}
    </div>
  );
}

function GameResult({ icon, title, subtitle, xp, onComplete, review = [] }) {
  // review = [{ question, yourAnswer, correctAnswer, correct }]
  return (
    <div style={{ ...S.gameWrap, paddingBottom: 60 }}>
      <div style={{ textAlign: "center", padding: "28px 0 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 6 }}>{icon}</div>
        <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "0 0 4px" }}>{title}</h2>
        {subtitle && <p style={{ color: "#94a3b8", marginBottom: 4, fontSize: 13 }}>{subtitle}</p>}
        <p style={{ color: "#fbbf24", fontWeight: 700, fontSize: 16, margin: "8px 0 0" }}>+{xp} XP earned</p>
      </div>

      {review.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ color: "#475569", fontSize: 10, fontWeight: 800, letterSpacing: 2, margin: "0 0 10px" }}>ROUND REVIEW</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {review.map((r, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "20px 1fr 1fr",
                gap: 8, alignItems: "center",
                background: r.correct ? "rgba(52,211,153,0.06)" : "rgba(239,68,68,0.06)",
                border: `1px solid ${r.correct ? "rgba(52,211,153,0.18)" : "rgba(239,68,68,0.18)"}`,
                borderRadius: 10, padding: "8px 12px",
              }}>
                <span style={{ fontSize: 13 }}>{r.correct ? "✓" : "✗"}</span>
                <div>
                  <div style={{ color: "#94a3b8", fontSize: 10, marginBottom: 1 }}>Q{i+1}</div>
                  <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>{r.question}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {r.correct ? (
                    <div style={{ color: "#34d399", fontSize: 12, fontWeight: 600 }}>{r.correctAnswer}</div>
                  ) : (
                    <>
                      <div style={{ color: "#ef4444", fontSize: 11, textDecoration: "line-through", opacity: 0.7 }}>{r.yourAnswer || "—"}</div>
                      <div style={{ color: "#34d399", fontSize: 12, fontWeight: 600 }}>{r.correctAnswer}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button style={{ ...S.primaryBtn, width: "100%" }} onClick={onComplete}>Continue</button>
    </div>
  );
}

const AVATAR_OPTIONS = ["😎","🧠","🌍","🦊","🐉","🦁","🐺","🦅","🌟","🔥","⚡","🎯","🏆","🎮","🚀","👾","🦄","🐸","🎭","🌊"];

// ─── EMOJI PICKER (reusable) ───────────────────────────────────────────────────
function EmojiPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        fontSize: 52, background: "rgba(255,255,255,0.07)", border: "2px solid rgba(255,255,255,0.12)",
        borderRadius: 18, width: 80, height: 80, cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        {value}
        <span style={{ position: "absolute", bottom: 4, right: 6, fontSize: 12, color: "#6366f1" }}>✏️</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
          background: "#0f1629", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16,
          padding: 12, zIndex: 100, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, width: 200,
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}>
          {AVATAR_OPTIONS.map(e => (
            <button key={e} onClick={() => { onChange(e); setOpen(false); }} style={{
              fontSize: 26, background: e === value ? "rgba(99,102,241,0.3)" : "transparent",
              border: e === value ? "1px solid #6366f1" : "1px solid transparent",
              borderRadius: 10, padding: "4px", cursor: "pointer",
            }}>{e}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── HINT TOGGLE ─────────────────────────────────────────────────────────────
// Self-contained: hidden by default, tap to reveal once per question.
function HintToggle({ hint }) {
  const [shown, setShown] = useState(false);
  return (
    <div style={{ textAlign: "center", marginTop: 12 }}>
      {shown
        ? <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>{hint}</p>
        : <button onClick={() => setShown(true)} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.08)",
            color: "#334155", borderRadius: 20, padding: "4px 14px",
            fontSize: 11, cursor: "pointer", fontWeight: 600,
          }}>Show hint</button>
      }
    </div>
  );
}


// ─── COUNTRY PICKER ───────────────────────────────────────────────────────────
function CountryPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const selected = FLAGS.find(f => f.code === value);
  const filtered = FLAGS.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.region.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const pick = (code) => { onChange(code); setOpen(false); setSearch(""); };

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12, padding: "11px 14px", cursor: "pointer", textAlign: "left",
      }}>
        <span style={{ display: "flex", alignItems: "center", width: 28, justifyContent: "center" }}>{selected ? <FlagIcon code={selected.code} height={18} /> : <span style={{ fontSize: 20 }}>🌍</span>}</span>
        <span style={{ color: selected ? "#e2e8f0" : "#475569", fontWeight: 600, fontSize: 14, flex: 1 }}>
          {selected ? selected.name : "Select your home country"}
        </span>
        <span style={{ color: "#334155", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 200,
          background: "#0d1423", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
          overflow: "hidden",
        }}>
          <div style={{ padding: "10px 10px 6px" }}>
            <input
              ref={inputRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search countries…"
              style={{ ...S.input, fontSize: 13, padding: "8px 12px", color: "#fff" }}
            />
          </div>
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {value && (
              <button onClick={() => pick(null)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                background: "transparent", border: "none", padding: "9px 14px",
                cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <span style={{ fontSize: 16 }}>✕</span>
                <span style={{ color: "#475569", fontSize: 13 }}>Clear selection</span>
              </button>
            )}
            {filtered.map(f => (
              <button key={f.code} onClick={() => pick(f.code)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                background: f.code === value ? "rgba(99,102,241,0.18)" : "transparent",
                border: "none", padding: "9px 14px", cursor: "pointer",
                borderLeft: f.code === value ? "2px solid #6366f1" : "2px solid transparent",
              }}>
                <span style={{ display: "flex", alignItems: "center", width: 28, justifyContent: "center" }}><FlagIcon code={f.code} height={18} /></span>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <div style={{ color: f.code === value ? "#a78bfa" : "#e2e8f0", fontWeight: f.code === value ? 700 : 500, fontSize: 13 }}>{f.name}</div>
                  <div style={{ color: "#334155", fontSize: 10 }}>{f.region}</div>
                </div>
                {f.code === value && <span style={{ color: "#6366f1", fontSize: 14 }}>✓</span>}
              </button>
            ))}
            {filtered.length === 0 && (
              <p style={{ color: "#334155", fontSize: 13, textAlign: "center", padding: "16px" }}>No countries found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("😎");
  const [homeCountry, setHomeCountry] = useState(null);
  const submit = () => { if (name.trim()) onDone(name.trim(), avatar, homeCountry); };
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#060a12", padding: 24 }}>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
      <div style={{ textAlign: "center", maxWidth: 380, width: "100%" }}>
        <div style={{ fontSize: 80, marginBottom: 16, display: "inline-block", animation: "float 3s ease-in-out infinite" }}>🌍</div>
        <h1 style={{ ...S.logo, fontSize: 42, marginBottom: 8, display: "block" }}>FlagMaster</h1>
        <p style={{ color: "#475569", marginBottom: 40, fontSize: 15 }}>Know every flag on Earth</p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 32 }}>
          <p style={{ color: "#94a3b8", marginBottom: 16, fontSize: 14 }}>Set up your profile</p>

          {/* Avatar row */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, textAlign: "left" }}>
            <EmojiPicker value={avatar} onChange={setAvatar} />
            <div style={{ flex: 1 }}>
              <p style={{ color: "#475569", fontSize: 11, margin: "0 0 6px", fontWeight: 700, letterSpacing: 1 }}>USERNAME</p>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()}
                placeholder="Enter username..."
                maxLength={20}
                autoFocus
                style={{ ...S.input, margin: 0 }}
              />
            </div>
          </div>

          {/* Country picker */}
          <p style={{ color: "#475569", fontSize: 11, margin: "0 0 6px", fontWeight: 700, letterSpacing: 1, textAlign: "left" }}>HOME COUNTRY <span style={{ color: "#334155", fontWeight: 400 }}>(optional)</span></p>
          <CountryPicker value={homeCountry} onChange={setHomeCountry} />

          <p style={{ color: "#334155", fontSize: 11, margin: "14px 0 16px" }}>Start your journey 🌍</p>
          <button onClick={submit} disabled={!name.trim()} style={{ ...S.primaryBtn, width: "100%", opacity: name.trim() ? 1 : 0.4 }}>
            Start Playing →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FLAG PICKER GAME (country name → pick correct flag) ────────────────────
function FlagPickerGame({ onExit, onComplete }) {
  const TOTAL = 10;
  const [questions] = useState(() => shuffle(FLAGS).slice(0, TOTAL));
  const [current, setCurrent]   = useState(0);
  const [options, setOptions]   = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [streak, setStreak]     = useState(0);
  const [done, setDone]         = useState(false);
  const [animKey, setAnimKey]   = useState(0);
  const [kuRef]                 = useState([]);
  const [reviewRef]             = useState([]);

  useEffect(() => {
    const q = questions[current];
    const wrong = shuffle(FLAGS.filter(f => f.code !== q.code)).slice(0, 3);
    setOptions(shuffle([q, ...wrong]));
    setSelected(null);
    setAnimKey(k => k + 1);
  }, [current]);

  const choose = (opt) => {
    if (selected) return;
    setSelected(opt.code);
    const q = questions[current];
    const correct = opt.code === q.code;
    kuRef.push({ category: "flags", id: q.code, wasCorrect: correct, confusedWithId: correct ? null : opt.code });
    reviewRef.push({ question: q.name, yourAnswer: opt.name, correctAnswer: q.name, correct });
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); }
    else setStreak(0);
    setTimeout(() => {
      if (current + 1 >= TOTAL) setDone(true);
      else setCurrent(c => c + 1);
    }, 950);
  };

  if (done) {
    const xp = score * 12 + (score === TOTAL ? 60 : 0);
    return <GameResult icon={score >= 8 ? "🎉" : score >= 5 ? "👍" : "😬"}
      title={`${score}/${TOTAL} Correct`} xp={xp} review={reviewRef}
      onComplete={() => onComplete({ xp, correct: score, total: TOTAL, knowledgeUpdates: kuRef })} />;
  }

  const q = questions[current];
  return (
    <GameShell hud={<><div style={S.stat}>🔥 {streak}</div><div style={S.stat}>{current + 1}/{TOTAL}</div></>}
      progress={current / TOTAL} onExit={onExit}>
      <div key={animKey} style={{ animation: "slideIn 0.25s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {/* Show country name and region — NOT the flag */}
        <div style={{ textAlign: "center", padding: "12px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20 }}>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, margin: "0 0 4px", letterSpacing: -0.5 }}>{q.name}</h2>
          <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>{q.region}</p>
        </div>
        <p style={S.question}>Which flag belongs to this country?</p>
        {/* 2×2 grid of flag images */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 360 }}>
          {options.map(opt => {
            let borderColor = "rgba(255,255,255,0.1)";
            let bg          = "rgba(255,255,255,0.03)";
            if (selected) {
              if (opt.code === q.code)                            { borderColor = "#34d399"; bg = "rgba(52,211,153,0.12)"; }
              else if (opt.code === selected && selected !== q.code) { borderColor = "#ef4444"; bg = "rgba(239,68,68,0.12)"; }
              else                                                { bg = "rgba(255,255,255,0.01)"; }
            }
            return (
              <button key={opt.code} onClick={() => choose(opt)} style={{
                background: bg, border: `2px solid ${borderColor}`, borderRadius: 16,
                padding: 10, cursor: "pointer", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 8, transition: "all 0.2s",
                opacity: selected && opt.code !== q.code && opt.code !== selected ? 0.45 : 1,
              }}>
                <FlagImg code={opt.code} size={120} />
                {selected && (
                  <span style={{ color: opt.code === q.code ? "#34d399" : opt.code === selected ? "#f87171" : "#334155", fontSize: 11, fontWeight: 700 }}>
                    {opt.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </GameShell>
  );
}

// ─── SOLO MULTIPLE CHOICE ─────────────────────────────────────────────────────
function SoloMCGame({ onExit, onComplete }) {
  const TOTAL = 10;
  const [questions] = useState(() => shuffle(FLAGS).slice(0, TOTAL));
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [kuRef] = useState([]);
  const [reviewRef] = useState([]);

  useEffect(() => {
    const q = questions[current];
    const wrong = shuffle(FLAGS.filter(f => f.code !== q.code)).slice(0, 3);
    setOptions(shuffle([q, ...wrong]));
    setSelected(null);
    setAnimKey(k => k + 1);
  }, [current]);

  const choose = (opt) => {
    if (selected) return;
    setSelected(opt.code);
    const q = questions[current];
    const correct = opt.code === q.code;
    kuRef.push({ category: "flags", id: q.code, wasCorrect: correct, confusedWithId: correct ? null : opt.code });
    reviewRef.push({ question: q.name, yourAnswer: opt.name, correctAnswer: q.name, correct });
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); }
    else setStreak(0);
    setTimeout(() => {
      if (current + 1 >= TOTAL) setDone(true);
      else setCurrent(c => c + 1);
    }, 950);
  };

  if (done) {
    const xp = score * 12 + (score === TOTAL ? 60 : 0);
    return <GameResult icon={score >= 8 ? "🎉" : score >= 5 ? "👍" : "😬"}
      title={`${score}/${TOTAL} Correct`} xp={xp} review={reviewRef}
      onComplete={() => onComplete({ xp, correct: score, total: TOTAL, knowledgeUpdates: kuRef })} />;
  }

  const q = questions[current];
  return (
    <GameShell hud={<><div style={S.stat}>🔥 {streak}</div><div style={S.stat}>{current + 1}/{TOTAL}</div></>}
      progress={current / TOTAL} onExit={onExit}>
      <div key={animKey} style={{ animation: "slideIn 0.25s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <FlagImg code={q.code} size={260} />
        <p style={S.question}>Which country is this?</p>
        <div style={S.grid2}>
          {options.map(opt => {
            let extra = {};
            if (selected) {
              if (opt.code === q.code) extra = { background: "rgba(52,211,153,0.2)", borderColor: "#34d399" };
              else if (opt.code === selected) extra = { background: "rgba(239,68,68,0.2)", borderColor: "#ef4444" };
            }
            return (
              <button key={opt.code} onClick={() => choose(opt)} style={{ ...S.option, ...extra, justifyContent: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{opt.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </GameShell>
  );
}

// ─── SOLO TYPING ──────────────────────────────────────────────────────────────
function SoloTypingGame({ onExit, onComplete }) {
  const TOTAL = 10;
  const [questions] = useState(() => shuffle(FLAGS).slice(0, TOTAL));
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null); // null | "correct" | "wrong"
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [times, setTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const inputRef = useRef(null);
  const [kuRef] = useState([]);
  const [reviewRef] = useState([]);

  useEffect(() => {
    setStartTime(Date.now());
    setInput("");
    setStatus(null);
    inputRef.current?.focus();
  }, [current]);

  const commit = (isSkip = false) => {
    if (status) return;
    const q = questions[current];
    const correct = !isSkip && isCorrectTyping(input, q.name);
    setStatus(correct ? "correct" : "wrong");
    setTimes(t => [...t, (Date.now() - startTime) / 1000]);
    kuRef.push({ category: "flags", id: q.code, wasCorrect: correct, confusedWithId: null });
    reviewRef.push({ question: `Flag of ${q.name}`, yourAnswer: isSkip ? "(skipped)" : input, correctAnswer: q.name, correct });
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); }
    else setStreak(0);
    setTimeout(() => {
      if (current + 1 >= TOTAL) setDone(true);
      else setCurrent(c => c + 1);
    }, 900);
  };

  if (done) {
    const avg = times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) : "—";
    const xp = score * 18 + (score === TOTAL ? 80 : 0);
    return <GameResult icon={score >= 8 ? "⌨️" : "📝"} title={`${score}/${TOTAL} Correct`}
      subtitle={`Avg. time: ${avg}s`} xp={xp} review={reviewRef}
      onComplete={() => onComplete({ xp, correct: score, total: TOTAL, knowledgeUpdates: kuRef })} />;
  }

  const q = questions[current];
  const borderColor = status === "correct" ? "#34d399" : status === "wrong" ? "#ef4444" : "rgba(255,255,255,0.12)";

  return (
    <GameShell hud={<><div style={S.stat}>🔥 {streak}</div><div style={S.stat}>{current + 1}/{TOTAL}</div></>}
      progress={current / TOTAL} onExit={onExit}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <FlagImg code={q.code} size={260} />
        <p style={S.question}>Type the country name</p>
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ position: "relative" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && commit(false)}
              placeholder="Type here..."
              style={{ ...S.input, border: `2px solid ${borderColor}`, transition: "border-color 0.2s", paddingRight: status === "wrong" ? 120 : 48, color: "#fff" }}
              autoComplete="off"
              spellCheck={false}
            />
            {status === "correct" && (
              <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#34d399", fontSize: 22 }}>✓</span>
            )}
            {status === "wrong" && (
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#f87171", fontSize: 12, fontWeight: 700 }}>
                → {q.name}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={() => commit(false)} style={{ ...S.primaryBtn, flex: 1 }}>Submit ↵</button>
            <button onClick={() => commit(true)} style={S.ghostBtn}>Skip</button>
          </div>
          <HintToggle hint={`Starts with "${q.name[0]}" — ${q.name.length} letters`} />
        </div>
      </div>
    </GameShell>
  );
}

// ─── FLASHCARD ────────────────────────────────────────────────────────────────
function FlashcardGame({ onExit, onComplete }) {
  const [deck] = useState(() => shuffle(FLAGS));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);
  const [kuRef] = useState([]);
  const [reviewRef] = useState([]);

  if (idx >= deck.length) {
    const xp = known * 5;
    return <GameResult icon="📚" title="Deck Complete!"
      subtitle={`✅ ${known} Known · 🔄 ${learning} Still Learning`}
      xp={xp} review={reviewRef}
      onComplete={() => onComplete({ xp, correct: known, total: deck.length, knowledgeUpdates: kuRef })} />;
  }

  const card = deck[idx];
  const next = (wasKnown) => {
    kuRef.push({ category: "flags", id: card.code, wasCorrect: wasKnown, confusedWithId: null });
    reviewRef.push({ question: card.name, yourAnswer: wasKnown ? "Got it" : "Still learning", correctAnswer: card.name, correct: wasKnown });
    if (wasKnown) setKnown(k => k + 1); else setLearning(l => l + 1);
    setFlipped(false);
    setIdx(i => i + 1);
  };

  return (
    <GameShell hud={<><div style={S.stat}>✅ {known}</div><div style={S.stat}>{idx + 1}/{deck.length}</div></>}
      progress={idx / deck.length} onExit={onExit}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div onClick={() => setFlipped(f => !f)} style={{
          width: "100%", maxWidth: 360, minHeight: 260,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 22, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 28, userSelect: "none",
        }}>
          {!flipped ? (
            <>
              <FlagImg code={card.code} size={220} />
              <p style={{ color: "#334155", marginTop: 16, fontSize: 12 }}>Tap to reveal</p>
            </>
          ) : (
            <>
              <span style={{ fontSize: 72, lineHeight: 1 }}>{card.emoji}</span>
              <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "12px 0 4px" }}>{card.name}</h2>
              <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>{card.code} · {card.region}</p>
            </>
          )}
        </div>
        {flipped && (
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={() => next(false)} style={{ ...S.primaryBtn, background: "rgba(239,68,68,0.3)", border: "1px solid #ef4444" }}>
              🔄 Still Learning
            </button>
            <button onClick={() => next(true)} style={{ ...S.primaryBtn, background: "rgba(52,211,153,0.3)", border: "1px solid #34d399" }}>
              ✅ Got It
            </button>
          </div>
        )}
      </div>
    </GameShell>
  );
}

// ─── SPEED ROUND ──────────────────────────────────────────────────────────────
function SpeedRound({ onExit, onComplete }) {
  const [questions] = useState(() => shuffle(FLAGS));
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [done, setDone] = useState(false);
  const [kuRef] = useState([]);
  const [reviewRef] = useState([]);

  useEffect(() => {
    const q = questions[current % questions.length];
    const wrong = shuffle(FLAGS.filter(f => f.code !== q.code)).slice(0, 3);
    setOptions(shuffle([q, ...wrong]));
  }, [current]);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setTimeLeft(tt => {
      if (tt <= 1) { setDone(true); return 0; }
      return tt - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [done]);

  if (done) {
    const xp = score * 7;
    return <GameResult icon="⚡" title={`${score} Correct!`} subtitle="Speed Round complete" xp={xp} review={reviewRef}
      onComplete={() => onComplete({ xp, correct: score, total: current, knowledgeUpdates: kuRef })} />;
  }

  const q = questions[current % questions.length];
  const timerColor = timeLeft <= 10 ? "#ef4444" : timeLeft <= 20 ? "#fbbf24" : "#34d399";

  return (
    <GameShell hud={<>
      <div style={{ ...S.stat, color: timerColor, fontSize: 22, fontWeight: 900 }}>{timeLeft}s</div>
      <div style={S.stat}>✓ {score}</div>
    </>} progress={1 - timeLeft / 30} onExit={onExit}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <FlagImg code={q.code} size={240} />
        <div style={S.grid2}>
          {options.map(opt => (
            <button key={opt.code + current} onClick={() => {
              const correct = opt.code === q.code;
              kuRef.push({ category: "flags", id: q.code, wasCorrect: correct, confusedWithId: correct ? null : opt.code });
              reviewRef.push({ question: q.name, yourAnswer: opt.name, correctAnswer: q.name, correct });
              if (correct) setScore(s => s + 1);
              setCurrent(c => c + 1);
            }} style={{ ...S.option, justifyContent: "center" }}>
              <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{opt.name}</span>
            </button>
          ))}
        </div>
      </div>
    </GameShell>
  );
}


// ─── CAPITALS MC GAME ─────────────────────────────────────────────────────────
function CapitalsMCGame({ onExit, onComplete }) {
  const TOTAL = 10;
  const [questions] = useState(() => shuffle(CAPITALS).slice(0, TOTAL));
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [mode, setMode] = useState("country"); // "country" = show country, guess capital
  const [kuRef] = useState([]);
  const [reviewRef] = useState([]);

  useEffect(() => {
    const q = questions[current];
    const wrong = shuffle(CAPITALS.filter(c => c.capital !== q.capital)).slice(0, 3);
    setOptions(shuffle([q, ...wrong]));
    setSelected(null);
    setAnimKey(k => k + 1);
  }, [current]);

  const choose = (opt) => {
    if (selected) return;
    const q = questions[current];
    setSelected(opt.capital);
    const correct = opt.capital === q.capital;
    kuRef.push({ category: "capitals", id: q.country, wasCorrect: correct, confusedWithId: correct ? null : opt.country });
    reviewRef.push({ question: q.country, yourAnswer: opt.capital, correctAnswer: q.capital, correct });
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); }
    else setStreak(0);
    setTimeout(() => {
      if (current + 1 >= TOTAL) setDone(true);
      else setCurrent(c => c + 1);
    }, 950);
  };

  if (done) {
    const xp = score * 14 + (score === TOTAL ? 70 : 0);
    return <GameResult icon={score >= 8 ? "🎉" : score >= 5 ? "🗺️" : "😬"}
      title={`${score}/${TOTAL} Correct`} xp={xp} review={reviewRef}
      onComplete={() => onComplete({ xp, correct: score, total: TOTAL, knowledgeUpdates: kuRef })} />;
  }

  const q = questions[current];
  return (
    <GameShell hud={<><div style={S.stat}>🔥 {streak}</div><div style={S.stat}>{current + 1}/{TOTAL}</div></>}
      progress={current / TOTAL} onExit={onExit}>
      <div key={animKey} style={{ animation: "slideIn 0.25s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 80, lineHeight: 1, marginBottom: 12 }}>{q.emoji}</div>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "0 0 4px" }}>{q.country}</h2>
          <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>{q.region}</p>
        </div>
        <p style={S.question}>What is the capital city?</p>
        <div style={S.grid2}>
          {options.map(opt => {
            let extra = {};
            if (selected) {
              if (opt.capital === q.capital) extra = { background: "rgba(52,211,153,0.2)", borderColor: "#34d399" };
              else if (opt.capital === selected) extra = { background: "rgba(239,68,68,0.2)", borderColor: "#ef4444" };
            }
            return (
              <button key={opt.capital} onClick={() => choose(opt)} style={{ ...S.option, ...extra, justifyContent: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{opt.capital}</span>
              </button>
            );
          })}
        </div>
      </div>
    </GameShell>
  );
}

// ─── CAPITALS TYPING GAME ─────────────────────────────────────────────────────
function CapitalsTypingGame({ onExit, onComplete }) {
  const TOTAL = 10;
  const [questions] = useState(() => shuffle(CAPITALS).slice(0, TOTAL));
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [times, setTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const inputRef = useRef(null);
  const [kuRef] = useState([]);
  const [reviewRef] = useState([]);

  useEffect(() => {
    setStartTime(Date.now());
    setInput("");
    setStatus(null);
    inputRef.current?.focus();
  }, [current]);

  const commit = (isSkip = false) => {
    if (status) return;
    const q = questions[current];
    const correct = !isSkip && isCorrectTyping(input, q.capital);
    setStatus(correct ? "correct" : "wrong");
    setTimes(t => [...t, (Date.now() - startTime) / 1000]);
    kuRef.push({ category: "capitals", id: q.country, wasCorrect: correct, confusedWithId: null });
    reviewRef.push({ question: q.country, yourAnswer: isSkip ? "(skipped)" : input, correctAnswer: q.capital, correct });
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); }
    else setStreak(0);
    setTimeout(() => {
      if (current + 1 >= TOTAL) setDone(true);
      else setCurrent(c => c + 1);
    }, 900);
  };

  if (done) {
    const avg = times.length ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) : "—";
    const xp = score * 20 + (score === TOTAL ? 90 : 0);
    return <GameResult icon={score >= 8 ? "✏️" : "📝"} title={`${score}/${TOTAL} Correct`}
      subtitle={`Avg. time: ${avg}s`} xp={xp} review={reviewRef}
      onComplete={() => onComplete({ xp, correct: score, total: TOTAL, knowledgeUpdates: kuRef })} />;
  }

  const q = questions[current];
  const borderColor = status === "correct" ? "#34d399" : status === "wrong" ? "#ef4444" : "rgba(255,255,255,0.12)";

  return (
    <GameShell hud={<><div style={S.stat}>🔥 {streak}</div><div style={S.stat}>{current + 1}/{TOTAL}</div></>}
      progress={current / TOTAL} onExit={onExit}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 80, lineHeight: 1, marginBottom: 12 }}>{q.emoji}</div>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "0 0 4px" }}>{q.country}</h2>
          <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>{q.region}</p>
        </div>
        <p style={S.question}>Type the capital city</p>
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ position: "relative" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && commit(false)}
              placeholder="Type here..."
              style={{ ...S.input, border: `2px solid ${borderColor}`, transition: "border-color 0.2s", paddingRight: status === "wrong" ? 130 : 48, color: "#fff" }}
              autoComplete="off"
              spellCheck={false}
            />
            {status === "correct" && (
              <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#34d399", fontSize: 22 }}>✓</span>
            )}
            {status === "wrong" && (
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#f87171", fontSize: 12, fontWeight: 700 }}>
                → {q.capital}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={() => commit(false)} style={{ ...S.primaryBtn, flex: 1 }}>Submit ↵</button>
            <button onClick={() => commit(true)} style={S.ghostBtn}>Skip</button>
          </div>
          <HintToggle hint={`Starts with "${q.capital[0]}" — ${q.capital.length} letters`} />
        </div>
      </div>
    </GameShell>
  );
}

// ─── SPACED REPETITION HELPERS ────────────────────────────────────────────────
// Score: 0 = never seen / totally unknown → 1 = mastered
// Priority for testing = 1 - score (higher = needs more practice)
function itemScore(k) {
  if (!k) return 0;
  const total = k.correct + k.wrong;
  if (total === 0) return 0;
  const accuracy = k.correct / total;
  // Decay: items not seen recently drift back toward needing practice
  const hoursSince = (Date.now() - (k.lastSeen || 0)) / 3600000;
  const recency = Math.max(0, 1 - hoursSince / 72); // fully decayed after 3 days
  return Math.min(1, accuracy * (0.6 + 0.4 * recency));
}

// Build a prioritised practice queue from knowledge data
// Weights unseen items and frequently-confused items heavily
function buildPracticeQueue(items, knowledge, getKey, n = 15) {
  const scored = items.map(item => {
    const k = knowledge[getKey(item)];
    const score = itemScore(k);
    // Boost items that were confused with others recently
    const confusionPenalty = k ? Object.values(k.confusedWith || {}).reduce((a, b) => a + b, 0) * 0.05 : 0;
    const priority = (1 - score) + confusionPenalty + (Math.random() * 0.15); // small random jitter
    return { item, score, priority };
  });
  scored.sort((a, b) => b.priority - a.priority);
  return scored.slice(0, n);
}

// ─── ADAPTIVE PRACTICE SESSION ────────────────────────────────────────────────
function AdaptivePractice({ category, knowledge, onComplete, onExit }) {
  const items = category === "flags" ? FLAGS : CAPITALS;
  const getKey = category === "flags" ? (f) => f.code : (c) => c.country;
  const getLabel = category === "flags" ? (f) => f.name : (c) => c.capital;
  const getSubLabel = category === "flags" ? (f) => f.region : (c) => c.country;

  // Question count selector: null = picking, number = chosen
  const [questionCount, setQuestionCount] = useState(null);

  const [queue] = useState(() => {
    // Build a large pool; user picks how many to do
    const q = buildPracticeQueue(items, knowledge, getKey, items.length);
    return q.map(({ item }) => item);
  });
  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [kuRef] = useState([]);
  const [reviewRef] = useState([]);

  // Early exit — save whatever has been answered so far
  const saveAndExit = () => {
    const doneCount = current;
    const xp = score * 8;
    onComplete({ xp, correct: score, total: doneCount, knowledgeUpdates: kuRef, review: reviewRef, earlyExit: true });
  };

  useEffect(() => {
    if (!questionCount) return;
    const q = queue[current];
    if (!q) return;
    const correctKey = getKey(q);
    const kData = knowledge[correctKey];
    const topConfusers = kData
      ? Object.entries(kData.confusedWith || {}).sort((a,b) => b[1]-a[1]).slice(0,2).map(([id]) => id)
      : [];
    const confuserItems = items.filter(i => topConfusers.includes(getKey(i)));
    const remaining = items.filter(i => getKey(i) !== correctKey && !topConfusers.includes(getKey(i)));
    const fillerCount = Math.max(0, 3 - confuserItems.length);
    const filler = shuffle(remaining).slice(0, fillerCount);
    setOptions(shuffle([q, ...confuserItems, ...filler]));
    setSelected(null);
    setAnimKey(k => k + 1);
  }, [current, questionCount]);

  const choose = (opt) => {
    if (selected) return;
    const q = queue[current];
    const correct = getKey(opt) === getKey(q);
    setSelected(getKey(opt));
    kuRef.push({ category, id: getKey(q), wasCorrect: correct, confusedWithId: correct ? null : getKey(opt) });
    reviewRef.push({ question: getLabel(q), yourAnswer: getLabel(opt), correctAnswer: getLabel(q), correct });
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      const isLast = current + 1 >= Math.min(questionCount, queue.length);
      if (isLast) {
        const finalScore = score + (correct ? 1 : 0);
        const xp = finalScore * 8;
        onComplete({ xp, correct: finalScore, total: Math.min(questionCount, queue.length), knowledgeUpdates: kuRef, review: [...reviewRef] });
      } else {
        setCurrent(c => c + 1);
      }
    }, 900);
  };

  // ── Question count picker ──
  if (!questionCount) {
    if (!queue.length) return (
      <div style={{ ...S.gameWrap, justifyContent: "center", textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 64 }}>🎉</div>
        <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800 }}>Nothing to practice!</h2>
        <p style={{ color: "#64748b" }}>Play some games first to build your knowledge profile.</p>
        <button style={{ ...S.primaryBtn, marginTop: 20 }} onClick={onExit}>Back</button>
      </div>
    );
    return (
      <div style={{ ...S.gameWrap, paddingTop: 40 }}>
        <button onClick={onExit} style={{ ...S.backBtn, marginBottom: 24 }}>← Back</button>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{category === "flags" ? "🌍" : "🗺️"}</div>
          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: "0 0 6px" }}>Adaptive Practice</h2>
          <p style={{ color: "#64748b", fontSize: 13 }}>Questions ordered by what you need most · leave anytime to save progress</p>
        </div>
        <h3 style={{ color: "#475569", fontSize: 10, fontWeight: 800, letterSpacing: 2, marginBottom: 12 }}>HOW MANY QUESTIONS?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          {[10, 20, 30, 50].map(n => (
            <button key={n} onClick={() => setQuestionCount(Math.min(n, queue.length))} style={{
              ...S.primaryBtn, background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)", color: "#a78bfa", fontSize: 16, fontWeight: 800,
            }}>{n}</button>
          ))}
        </div>
        {/* Custom number input */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input
            type="number" min={1} max={queue.length}
            placeholder={`Custom (max ${queue.length})`}
            style={{ ...S.input, flex: 1, fontSize: 14 }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                const v = Math.min(Math.max(1, parseInt(e.target.value) || 1), queue.length);
                setQuestionCount(v);
              }
            }}
            id="practiceCustomN"
          />
          <button onClick={() => {
            const el = document.getElementById("practiceCustomN");
            const v = Math.min(Math.max(1, parseInt(el?.value) || 1), queue.length);
            setQuestionCount(v);
          }} style={{ ...S.primaryBtn, padding: "0 18px", whiteSpace: "nowrap" }}>Go</button>
        </div>
        <button onClick={() => setQuestionCount(queue.length)} style={{
          ...S.primaryBtn, width: "100%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
        }}>All {queue.length} 🔥</button>
      </div>
    );
  }

  const q = queue[current];
  if (!q) return null;
  const correctKey = getKey(q);
  const progress = current / Math.min(questionCount, queue.length);

  return (
    <GameShell hud={<>
      <div style={{ color: "#a78bfa", fontWeight: 700, fontSize: 13 }}>Practice</div>
      <div style={S.stat}>{current + 1}/{Math.min(questionCount, queue.length)}</div>
    </>} progress={progress} onExit={saveAndExit}>
      <div key={animKey} style={{ animation: "slideIn 0.25s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {category === "flags"
          ? <FlagImg code={q.code} size={240} />
          : <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 10 }}>{q.emoji}</div>
              <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: 0 }}>{q.country}</h2>
            </div>
        }
        <p style={S.question}>{category === "flags" ? "Which country?" : "What is the capital?"}</p>
        <div style={S.grid2}>
          {options.map(opt => {
            const key = getKey(opt);
            let extra = {};
            if (selected) {
              if (key === correctKey) extra = { background: "rgba(52,211,153,0.2)", borderColor: "#34d399" };
              else if (key === selected) extra = { background: "rgba(239,68,68,0.2)", borderColor: "#ef4444" };
            }
            return (
              <button key={key} onClick={() => choose(opt)} style={{ ...S.option, ...extra, justifyContent: "center" }}>
                <span style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 14 }}>{getLabel(opt)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </GameShell>
  );
}

// ─── LEARN PAGE ───────────────────────────────────────────────────────────────
function LearnPage({ profile, onGameComplete }) {
  const [view, setView] = useState("browse");       // "browse" | "practice" | "review"
  const [practiceCategory, setPracticeCategory] = useState("flags");
  const [learnCategory, setLearnCategory] = useState("flags");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [practiceResult, setPracticeResult] = useState(null);

  const knowledge = profile?.knowledge || { flags: {}, capitals: {} };

  // ── Review view ──
  if (view === "review" && practiceResult) {
    return (
      <GameResult
        icon={practiceResult.earlyExit ? "⏸️" : practiceResult.correct >= practiceResult.total * 0.8 ? "🎉" : "📚"}
        title={practiceResult.earlyExit ? `${practiceResult.correct}/${practiceResult.total} before exit` : `${practiceResult.correct}/${practiceResult.total} Correct`}
        subtitle={practiceResult.earlyExit ? "Progress saved!" : undefined}
        xp={practiceResult.xp}
        review={practiceResult.review || []}
        onComplete={() => { onGameComplete({ ...practiceResult, mode: "practice" }); setView("browse"); setPracticeResult(null); }}
      />
    );
  }

  // ── Practice view ──
  if (view === "practice") {
    return (
      <AdaptivePractice
        category={practiceCategory}
        knowledge={knowledge[practiceCategory] || {}}
        onComplete={(result) => {
          setPracticeResult(result);
          setView("review");
        }}
        onExit={() => setView("browse")}
      />
    );
  }

  // ── Browse / knowledge bank ──
  const regions = ["All", "Europe", "Asia", "Americas", "Africa", "Oceania"];
  const items = learnCategory === "flags" ? FLAGS : CAPITALS;
  const getKey = learnCategory === "flags" ? f => f.code : c => c.country;
  const filtered = items.filter(item => {
    const haystack = learnCategory === "flags"
      ? item.name
      : item.country + " " + item.capital;
    return haystack.toLowerCase().includes(search.toLowerCase()) &&
      (region === "All" || item.region === region);
  });

  // Compute mastery for each item
  const kData = knowledge[learnCategory] || {};

  const getMastery = (item) => {
    const k = kData[getKey(item)];
    return itemScore(k);
  };
  const getStrength = (score) => {
    if (score === 0) return { label: "Unseen",   color: "#334155", bar: "#334155" };
    if (score < 0.4) return { label: "Weak",     color: "#ef4444", bar: "#ef4444" };
    if (score < 0.7) return { label: "Learning", color: "#f59e0b", bar: "#f59e0b" };
    if (score < 0.9) return { label: "Good",     color: "#34d399", bar: "#34d399" };
    return               { label: "Mastered",    color: "#a78bfa", bar: "#a78bfa" };
  };

  // Overall stats
  const allScores = items.map(item => getMastery(item));
  const avgMastery = allScores.reduce((a, b) => a + b, 0) / allScores.length;
  const mastered  = allScores.filter(s => s >= 0.9).length;
  const weak      = allScores.filter(s => s > 0 && s < 0.4).length;
  const unseen    = allScores.filter(s => s === 0).length;

  // Sort: weakest first by default
  const sortedFiltered = [...filtered].sort((a, b) => getMastery(a) - getMastery(b));

  return (
    <div style={{ padding: "8px 0 60px" }}>
      {/* Category toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["flags","🌍 Flags"],["capitals","🗺️ Capitals"]].map(([id, label]) => (
          <button key={id} onClick={() => { setLearnCategory(id); setSearch(""); setRegion("All"); }} style={{
            flex: 1, padding: "9px", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13,
            border: learnCategory === id ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)",
            background: learnCategory === id ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.03)",
            color: learnCategory === id ? "#a78bfa" : "#475569",
          }}>{label}</button>
        ))}
      </div>

      {/* Mastery summary card */}
      <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: 18, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <p style={{ color: "#a78bfa", fontSize: 10, fontWeight: 800, letterSpacing: 2, margin: "0 0 2px" }}>YOUR PROGRESS</p>
            <p style={{ color: "#fff", fontSize: 22, fontWeight: 900, margin: 0 }}>{Math.round(avgMastery * 100)}% mastery</p>
          </div>
          <button onClick={() => { setPracticeCategory(learnCategory); setView("practice"); }} style={{
            ...S.primaryBtn, padding: "10px 18px", fontSize: 13,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          }}>
            Practice →
          </button>
        </div>
        <div style={{ height: 7, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ height: "100%", width: `${avgMastery * 100}%`, background: "linear-gradient(90deg,#ef4444,#f59e0b,#34d399,#a78bfa)", borderRadius: 4, transition: "width 0.6s" }} />
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[["🎯","Mastered",mastered,"#a78bfa"],["📈","Learning",items.length - mastered - unseen,"#34d399"],["⚠️","Weak",weak,"#ef4444"],["👁️","Unseen",unseen,"#475569"]].map(([icon, label, count, color]) => (
            <div key={label} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ color, fontWeight: 800, fontSize: 18 }}>{count}</div>
              <div style={{ color: "#334155", fontSize: 10 }}>{icon} {label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search + region filter */}
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search…" style={{ ...S.input, marginBottom: 10 }} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {regions.map(r => (
          <button key={r} onClick={() => setRegion(r)} style={{
            padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
            border: region === r ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)",
            background: region === r ? "rgba(99,102,241,0.2)" : "transparent",
            color: region === r ? "#a78bfa" : "#475569",
          }}>{r}</button>
        ))}
      </div>
      <p style={{ color: "#334155", fontSize: 11, marginBottom: 10 }}>Sorted weakest first · {filtered.length} items</p>

      {/* Item grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
        {sortedFiltered.map(item => {
          const key = getKey(item);
          const mastery = getMastery(item);
          const str = getStrength(mastery);
          const k = kData[key];
          const confusers = k ? Object.entries(k.confusedWith || {}).sort((a,b)=>b[1]-a[1]).slice(0,1) : [];
          return (
            <div key={key} style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 14,
              border: `1px solid ${str.bar}33`, padding: "12px 10px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            }}>
              {learnCategory === "flags"
                ? <FlagImg code={item.code} size={90} />
                : <div style={{ fontSize: 44, lineHeight: 1 }}>{item.emoji}</div>
              }
              <p style={{ color: "#e2e8f0", fontSize: 11, fontWeight: 700, textAlign: "center", margin: 0 }}>
                {learnCategory === "flags" ? item.name : item.capital}
              </p>
              <p style={{ color: "#475569", fontSize: 10, margin: 0 }}>
                {learnCategory === "flags" ? item.region : item.country}
              </p>
              {/* Mastery bar */}
              <div style={{ width: "100%", height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${mastery * 100}%`, background: str.bar, borderRadius: 4, transition: "width 0.4s" }} />
              </div>
              <div style={{ color: str.color, fontSize: 9, fontWeight: 700, letterSpacing: 1 }}>{str.label}</div>
              {confusers.length > 0 && (() => {
                const confId = confusers[0][0];
                const confItem = learnCategory === "flags"
                  ? FLAGS.find(f => f.code === confId)
                  : CAPITALS.find(c => c.country === confId);
                const confName = confItem ? (learnCategory === "flags" ? confItem.name : confItem.capital) : confId;
                return <div style={{ color: "#ef4444", fontSize: 9, textAlign: "center" }}>confused with {confName}</div>;
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ profile, onLogout, onReset, onUpdateProfile }) {
  const xpRank = getXPRank(profile.xp);
  const nextXP = XP_RANKS.find(r => r.minXP > profile.xp);
  const acc = profile.totalAnswered > 0 ? Math.round((profile.totalCorrect / profile.totalAnswered) * 100) : 0;
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const modeIcon = (m) => {
    if (m === "pvp") return "⚔️";
    if (m === "typing") return "⌨️";
    if (m === "speed") return "⚡";
    if (m === "flashcard") return "📚";
    if (m === "capitals") return "🗺️";
    if (m === "capitals typing") return "✏️";
    return "🧠";
  };

  return (
    <div style={{ padding: "8px 0 60px" }}>

      {/* ── Hero card ── */}
      <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,139,250,0.08))", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 24, padding: "28px 24px 24px", marginBottom: 16, textAlign: "center", position: "relative" }}>
        <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}><EmojiPicker value={profile.avatar || "😎"} onChange={(a) => onUpdateProfile({ ...profile, avatar: a })} /></div>
        <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "0 0 2px", letterSpacing: -0.5 }}>{profile.username}</h2>
        <p style={{ color: "#475569", fontSize: 12, margin: "0 0 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          {profile.homeCountry && (() => { const c = FLAGS.find(f => f.code === profile.homeCountry); return c ? <><FlagIcon code={profile.homeCountry} height={18} /><span style={{ marginLeft: 4 }}>{c.name}</span><span style={{ color: "#334155" }}>·</span></> : null; })()}
          <span>{profile.gamesPlayed} games</span>
        </p>

        {/* Home country picker */}
        <div style={{ marginBottom: 16, textAlign: "left" }}>
          <p style={{ color: "#334155", fontSize: 10, fontWeight: 800, letterSpacing: 2, marginBottom: 6 }}>HOME COUNTRY</p>
          <CountryPicker value={profile.homeCountry} onChange={(code) => onUpdateProfile({ ...profile, homeCountry: code })} />
        </div>

        {/* XP rank row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 18 }}>{xpRank.icon}</span>
          <span style={{ color: xpRank.color, fontWeight: 700 }}>{xpRank.name}</span>
          <span style={{ color: "#475569", fontSize: 12 }}>{profile.xp.toLocaleString()} XP</span>
        </div>

        {/* XP progress bar */}
        {nextXP && (() => {
          const pct = Math.min(100, Math.max(0, ((profile.xp - xpRank.minXP) / (nextXP.minXP - xpRank.minXP)) * 100));
          const remaining = Math.max(0, nextXP.minXP - profile.xp);
          return (
            <div style={{ width: "100%", maxWidth: 280, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#475569", marginBottom: 4 }}>
                <span>{xpRank.name}</span>
                <span>{nextXP.name}</span>
              </div>
              <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden", marginBottom: 4 }}>
                <div style={{ height: "100%", borderRadius: 4, transition: "width 0.6s", background: `linear-gradient(90deg,${xpRank.color},${nextXP.color})`, width: `${pct}%` }} />
              </div>
              <p style={{ color: "#475569", fontSize: 11, margin: 0 }}>{remaining.toLocaleString()} XP to {nextXP.name} · {Math.round(pct)}% there</p>
            </div>
          );
        })()}
      </div>

      {/* ── Stats grid ── */}
      <h3 style={{ ...S.sectionLabel, marginBottom: 10 }}>STATS</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          ["🎮", "Games Played",  profile.gamesPlayed],
          ["🎯", "Accuracy",      `${acc}%`],
          ["✅", "Correct Ans.",  profile.totalCorrect],
          ["🔥", "Best Streak",   profile.streak],
        ].map(([icon, label, val]) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 4 }}>{icon}</div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 22 }}>{val}</div>
            <div style={{ color: "#475569", fontSize: 11 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── Match history ── */}
      {profile.history.length > 0 && (
        <>
          <h3 style={{ ...S.sectionLabel, marginBottom: 10 }}>RECENT MATCHES</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {[...profile.history].reverse().slice(0, 12).map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "10px 14px" }}>
                <span style={{ fontSize: 20 }}>{modeIcon(h.mode)}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>{h.mode}</div>
                  <div style={{ color: "#475569", fontSize: 11 }}>{h.score}</div>
                </div>
                <div style={{ color: "#fbbf24", fontSize: 12, minWidth: 44, textAlign: "right" }}>+{h.xp} XP</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Account actions ── */}
      <h3 style={{ ...S.sectionLabel, marginBottom: 10 }}>ACCOUNT</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={onLogout} style={{ ...S.ghostBtn, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px" }}>
          <span>🚪</span> Log Out
        </button>

        {!showResetConfirm ? (
          <button onClick={() => setShowResetConfirm(true)} style={{ ...S.ghostBtn, width: "100%", color: "#ef4444", borderColor: "#ef444430", padding: "13px" }}>
            🗑️ Reset All Data
          </button>
        ) : (
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid #ef444440", borderRadius: 12, padding: "16px" }}>
            <p style={{ color: "#f87171", fontSize: 13, textAlign: "center", margin: "0 0 12px", fontWeight: 600 }}>
              This will permanently delete your profile and all progress. Are you sure?
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setShowResetConfirm(false)} style={{ ...S.ghostBtn, flex: 1 }}>Cancel</button>
              <button onClick={onReset} style={{ ...S.primaryBtn, flex: 1, background: "linear-gradient(135deg,#dc2626,#ef4444)" }}>Yes, Reset</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── GAME MODE PICKER ────────────────────────────────────────────────────────
// Three-step funnel: Category → Input Mode → Game Mode
function GameModePicker({ onStart }) {
  const [category, setCategory] = useState(null);   // "flags" | "capitals"
  const [inputMode, setInputMode] = useState(null);  // "mc" | "typing"
  const [gameMode, setGameMode] = useState(null);    // "solo" | "speed" | "pvp" | "flashcard"

  const reset = () => { setCategory(null); setInputMode(null); setGameMode(null); };
  const backToCategory = () => { setCategory(null); setInputMode(null); setGameMode(null); };
  const backToInput = () => { setInputMode(null); setGameMode(null); };

  // Derive the actual game id to launch
  const launch = (gm) => {
    // Map category + inputMode + gameMode → game id
    if (gm === "flashcard") { onStart("flashcard"); return; }
    if (gm === "pvp")       { onStart("pvp"); return; }
    if (gm === "pvp-type")  { onStart("pvp-type"); return; }
    if (gm === "tournament"){ onStart("tournament"); return; }

    if (category === "flags") {
      if (inputMode === "mc") {
        if (gm === "solo")  { onStart("solo-mc"); return; }
        if (gm === "speed") { onStart("speed"); return; }
      }
      if (inputMode === "typing") {
        if (gm === "solo")  { onStart("solo-type"); return; }
        if (gm === "speed") { onStart("speed"); return; } // speed is MC-only, show notif via startGame
      }
    }
    if (category === "capitals") {
      if (inputMode === "mc") {
        if (gm === "solo")  { onStart("capitals-mc"); return; }
        if (gm === "speed") { onStart("capitals-mc"); return; } // reuse mc for now
      }
      if (inputMode === "typing") {
        if (gm === "solo")  { onStart("capitals-type"); return; }
        if (gm === "speed") { onStart("capitals-type"); return; }
      }
    }
  };

  // ── Step colours ──
  const CAT_OPTIONS = [
    { id: "flags",    label: "World Flags",  sub: "196 countries — every UN member state", icon: "🌍", color: "#6366f1" },
    { id: "capitals", label: "Capitals",     sub: "All 196 capitals, including multi-capital countries", icon: "🗺️", color: "#8b5cf6" },
    { id: "currencies", label: "Currencies", sub: "Match currencies to countries",     icon: "💰", color: "#64748b", soon: true },
    { id: "languages",  label: "Languages",  sub: "Identify national languages",       icon: "🗣️", color: "#64748b", soon: true },
  ];

  const INPUT_OPTIONS = [
    { id: "mc",        label: "Multiple Choice", sub: "See flag → name the country",  icon: "🧠", color: "#6366f1" },
    { id: "flag-pick", label: "Flag Picker",     sub: "See country → pick the flag",  icon: "🏳️", color: "#0ea5e9", flagsOnly: true, direct: "flag-pick" },
    { id: "typing",    label: "Typing",          sub: "Type the answer yourself",     icon: "⌨️", color: "#06b6d4" },
    { id: "flashcard", label: "Flashcards",      sub: "Flip cards — flags only",      icon: "📚", color: "#10b981", flagsOnly: true },
  ];

  const GAME_OPTIONS = [
    { id: "solo",       label: "Classic Quiz",  sub: "10 questions, no timer",      icon: "🎯", color: "#6366f1" },
    { id: "speed",      label: "Speed Run",     sub: "30 seconds, max answers",     icon: "⚡", color: "#f59e0b" },
        { id: "tournament", label: "Tournament",    sub: "8-player bracket",            icon: "🏆", color: "#64748b", soon: true },
  ];

  // breadcrumb label helpers
  const catLabel    = CAT_OPTIONS.find(c => c.id === category);
  const inputLabel  = INPUT_OPTIONS.find(i => i.id === inputMode);

  // ── Breadcrumb ──
  const Breadcrumb = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
      <button onClick={backToCategory} style={{ background: "none", border: "none", color: "#6366f1", fontWeight: 700, fontSize: 12, cursor: "pointer", padding: 0 }}>
        Play
      </button>
      {category && <>
        <span style={{ color: "#334155", fontSize: 12 }}>›</span>
        <button onClick={inputMode ? backToInput : backToCategory} style={{ background: "none", border: "none", color: inputMode ? "#6366f1" : "#94a3b8", fontWeight: 700, fontSize: 12, cursor: "pointer", padding: 0 }}>
          {catLabel?.icon} {catLabel?.label}
        </button>
      </>}
      {inputMode && <>
        <span style={{ color: "#334155", fontSize: 12 }}>›</span>
        <span style={{ color: "#94a3b8", fontWeight: 700, fontSize: 12 }}>{inputLabel?.icon} {inputLabel?.label}</span>
      </>}
    </div>
  );

  // ── Step 1: Category ──
  if (!category) return (
    <div>
      <h3 style={S.sectionLabel}>CHOOSE CATEGORY</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
        {CAT_OPTIONS.map(opt => (
          <button key={opt.id} onClick={() => !opt.soon && setCategory(opt.id)} style={{
            background: opt.soon ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${opt.color}${opt.soon ? "22" : "44"}`,
            borderRadius: 18, padding: "18px 14px", textAlign: "left",
            cursor: opt.soon ? "not-allowed" : "pointer",
            opacity: opt.soon ? 0.45 : 1,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ fontSize: 32 }}>{opt.icon}</span>
              {opt.soon && <span style={{ fontSize: 9, fontWeight: 800, background: "rgba(255,255,255,0.07)", color: "#64748b", padding: "2px 8px", borderRadius: 20, letterSpacing: 1 }}>SOON</span>}
            </div>
            <p style={{ color: opt.soon ? "#334155" : "#e2e8f0", fontWeight: 700, fontSize: 15, margin: "0 0 4px" }}>{opt.label}</p>
            <p style={{ color: "#475569", fontSize: 11, margin: 0, lineHeight: 1.4 }}>{opt.sub}</p>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Step 2: Input Mode ──
  if (!inputMode) return (
    <div>
      <Breadcrumb />
      <h3 style={S.sectionLabel}>HOW DO YOU WANT TO PLAY?</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
        {INPUT_OPTIONS.filter(opt => !(opt.flagsOnly && category !== "flags")).map(opt => (
          <button key={opt.id} onClick={() => opt.direct ? onStart(opt.direct) : setInputMode(opt.id)} style={{
            background: "rgba(255,255,255,0.05)", border: `1px solid ${opt.color}44`,
            borderRadius: 16, padding: "16px 18px", textAlign: "left", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <span style={{ fontSize: 34, flexShrink: 0 }}>{opt.icon}</span>
            <div>
              <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 15, margin: "0 0 3px" }}>{opt.label}</p>
              <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>{opt.sub}</p>
            </div>
            <span style={{ marginLeft: "auto", color: "#334155", fontSize: 18 }}>{opt.direct ? "▶" : "›"}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Step 3: Game Mode ──
  // If flashcard was selected in step 2, skip step 3 and launch directly
  if (inputMode === "flashcard") { launch("flashcard"); return null; }

  return (
    <div>
      <Breadcrumb />
      <h3 style={S.sectionLabel}>CHOOSE GAME MODE</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 8 }}>
        {GAME_OPTIONS.filter(opt => !(opt.mcOnly && inputMode !== "mc")).map(opt => {
          const soon = opt.soon;
          return (
            <button key={opt.id} onClick={() => !soon && launch(opt.id)} style={{
              background: soon ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${opt.color}${soon ? "22" : "44"}`,
              borderRadius: 16, padding: "16px 18px", textAlign: "left",
              cursor: soon ? "not-allowed" : "pointer",
              opacity: soon ? 0.45 : 1,
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <span style={{ fontSize: 34, flexShrink: 0 }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <p style={{ color: soon ? "#334155" : "#e2e8f0", fontWeight: 700, fontSize: 15, margin: 0 }}>{opt.label}</p>
                  {soon && <span style={{ fontSize: 9, fontWeight: 800, background: "rgba(255,255,255,0.07)", color: "#64748b", padding: "2px 8px", borderRadius: 20, letterSpacing: 1 }}>SOON</span>}
                </div>
                <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>{opt.sub}</p>
              </div>
              {!soon && <span style={{ color: "#334155", fontSize: 18 }}>›</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useState(null);
  const [screen, setScreen] = useState("home");
  const [gameMode, setGameMode] = useState(null);
  const [tab, setTab] = useState("home");
  const [previousTab, setPreviousTab] = useState("home");
  const [notification, setNotification] = useState(null);

  // Load profile synchronously from localStorage on mount
  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const persistProfile = (p) => {
    setProfile(p);
    saveProfile(p);
  };

  const showNotif = (msg, color = "#34d399") => {
    setNotification({ msg, color });
    setTimeout(() => setNotification(null), 2500);
  };

  const handleOnboarding = (username, avatar = "😎", homeCountry = null) => {
    const p = { ...DEFAULT_PROFILE, username, avatar, homeCountry };
    persistProfile(p);
  };

  const startGame = (mode) => {
    if (["tournament", "daily", "pvp-type", "pvp"].includes(mode)) {
      showNotif("Coming soon! 🚧", "#f59e0b");
      return;
    }
    setPreviousTab(tab);
    setGameMode(mode);
    setScreen("game");
  };

  const handleGameComplete = (result) => {
    const { xp = 0, correct = 0, total = 0, knowledgeUpdates = [] } = result;
    const p = { ...profile };
    // Merge spaced-repetition knowledge
    if (!p.knowledge) p.knowledge = { flags: {}, capitals: {} };
    for (const { category, id, wasCorrect, confusedWithId } of knowledgeUpdates) {
      if (!p.knowledge[category]) p.knowledge[category] = {};
      const k = p.knowledge[category][id] || { correct: 0, wrong: 0, lastSeen: 0, confusedWith: {} };
      if (wasCorrect) k.correct++; else k.wrong++;
      k.lastSeen = Date.now();
      if (!wasCorrect && confusedWithId) {
        k.confusedWith[confusedWithId] = (k.confusedWith[confusedWithId] || 0) + 1;
      }
      p.knowledge[category][id] = k;
    }
    p.xp += xp;
    p.gamesPlayed += 1;
    p.totalCorrect += correct;
    p.totalAnswered += total;
    const modeLabel = gameMode === "solo-type" ? "typing" : gameMode === "speed" ? "speed" : gameMode === "flashcard" ? "flashcard" : gameMode === "capitals-mc" ? "capitals" : gameMode === "capitals-type" ? "capitals typing" : "quiz";
    p.history = [...(p.history || []), {
      mode: modeLabel,
      score: total > 0 ? `${correct}/${total}` : won ? "Win" : "Loss",
      xp,
      date: Date.now(),
    }];

    // ── Daily streak logic ──
    const STREAK_XP_GOAL = p.DAILY_STREAK_XP || 30;
    const todayStr = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    const prevDate = p.lastStreakDate;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    // Reset todayXP if it's a new calendar day
    if (p.lastPlayed && new Date(p.lastPlayed).toISOString().slice(0,10) !== todayStr) {
      p.todayXP = 0;
    }
    const xpBeforeToday = p.todayXP || 0;
    p.todayXP = xpBeforeToday + xp;
    p.lastPlayed = Date.now();
    // Check if crossing the daily XP threshold for the first time today
    let streakAwarded = false;
    if (xpBeforeToday < STREAK_XP_GOAL && p.todayXP >= STREAK_XP_GOAL) {
      if (prevDate === yesterday || prevDate === null) {
        p.dailyStreak = (p.dailyStreak || 0) + 1;
        p.lastStreakDate = todayStr;
        streakAwarded = true;
      } else if (prevDate !== todayStr) {
        // Streak broken — restart
        p.dailyStreak = 1;
        p.lastStreakDate = todayStr;
        streakAwarded = true;
      }
    } else if (p.lastStreakDate === todayStr) {
      // Already counted today, just keep it
    } else if (prevDate !== yesterday && prevDate !== todayStr && prevDate !== null) {
      // Missed a day — streak will reset on next qualifying day
    }
    // Update best streak
    if ((p.dailyStreak || 0) > (p.streak || 0)) p.streak = p.dailyStreak;

    persistProfile(p);

    if (streakAwarded && p.dailyStreak > 1) showNotif(`🔥 ${p.dailyStreak} day streak! Keep it up!`, "#f59e0b");
    else if (streakAwarded) showNotif("🔥 Streak started! Come back tomorrow!", "#f59e0b");
    else if (xp > 0) showNotif(`+${xp} XP earned!`);

    setScreen("home");
    setGameMode(null);
    setTab(previousTab);
  };

  const exitGame = () => { setScreen("home"); setGameMode(null); setTab(previousTab); };

  const handleLogout = () => {
    // Logout keeps the saved profile but returns to the login screen
    setProfile({ ...DEFAULT_PROFILE });
    setScreen("home");
    setTab("home");
  };

  const handleReset = () => {
    resetProfileStorage();
    setProfile({ ...DEFAULT_PROFILE });
    setScreen("home");
    setTab("home");
  };

  // ── Loading ──
  if (!profile) {
    return (
      <div style={{ background: "#060a12", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
        <div style={{ fontSize: 56, animation: "float 2s ease-in-out infinite" }}>🌍</div>
      </div>
    );
  }

  // ── Onboarding ──
  if (!profile.username) return <Onboarding onDone={handleOnboarding} />;

  // ── Game screens ──
  if (screen === "game") {
    const props = { onExit: exitGame, onComplete: handleGameComplete, profile };
    if (gameMode === "flag-pick")     return <FlagPickerGame {...props} />;
    if (gameMode === "solo-mc")       return <SoloMCGame {...props} />;
    if (gameMode === "solo-type")     return <SoloTypingGame {...props} />;
    if (gameMode === "flashcard")     return <FlashcardGame {...props} />;
    if (gameMode === "speed")         return <SpeedRound {...props} />;
    if (gameMode === "capitals-mc")   return <CapitalsMCGame {...props} />;
    if (gameMode === "capitals-type") return <CapitalsTypingGame {...props} />;
  }

  const xpRank = getXPRank(profile.xp);
  const nextXP = XP_RANKS.find(r => r.minXP > profile.xp);

  // ── Main shell ──
  return (
    <div style={{ background: "#060a12", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      <style>{`
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes slideIn  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown{ from{transform:translateY(-50px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes popIn    { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
        * { box-sizing: border-box; }
        button { transition: filter 0.15s, transform 0.1s; }
        button:hover  { filter: brightness(1.12); }
        button:active { transform: scale(0.97); }
        input { color: #fff; }
        input::placeholder { color: #334155; }
      `}</style>

      {notification && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: notification.color, color: "#000", padding: "10px 22px", borderRadius: 22, fontWeight: 800, fontSize: 14, zIndex: 9999, animation: "slideDown 0.3s ease", boxShadow: "0 4px 24px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
          {notification.msg}
        </div>
      )}

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 26 }}>{profile.avatar || "😎"}</span><h1 style={{ ...S.logo, fontSize: 26, margin: 0 }}>FlagMaster</h1></div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: 13 }}>⭐</span>
              <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: 12 }}>{profile.xp} XP</span>
            </div>
          </div>
        </div>

        {/* XP progress bar */}
        {nextXP && (
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#6366f1,#a78bfa)", transition: "width 0.6s ease", width: `${Math.min(100, ((profile.xp - xpRank.minXP) / (nextXP.minXP - xpRank.minXP)) * 100)}%` }} />
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: 4, marginBottom: 20 }}>
          {[["home","🎮","Play"],["learn","📖","Learn"],["profile","👤","Profile"]].map(([id, icon, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
              padding: "7px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 18,
              background: tab === id ? "rgba(99,102,241,0.22)" : "transparent",
              color: tab === id ? "#a78bfa" : "#334155",
            }}>
              <span>{icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "home" && (
          <div style={{ animation: "slideIn 0.3s ease", paddingBottom: 40 }}>
            {/* Welcome banner */}
            <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: "14px 18px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "#a78bfa", fontSize: 11, fontWeight: 700, letterSpacing: 2, margin: "0 0 2px" }}>WELCOME BACK</p>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: 0 }}>{profile.username}</h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: xpRank.color, fontSize: 12, fontWeight: 700 }}>{xpRank.icon} {xpRank.name}</div>
                <div style={{ color: "#475569", fontSize: 11 }}>{profile.gamesPlayed} games played</div>
              </div>
            </div>
            {/* Daily streak bar */}
            {(() => {
              const goal = profile.DAILY_STREAK_XP || 30;
              const todayXP = (() => {
                const todayStr = new Date().toISOString().slice(0,10);
                if (profile.lastPlayed && new Date(profile.lastPlayed).toISOString().slice(0,10) === todayStr) return profile.todayXP || 0;
                return 0;
              })();
              const pct = Math.min(100, (todayXP / goal) * 100);
              const done = todayXP >= goal;
              const streak = profile.dailyStreak || 0;
              const todayStr = new Date().toISOString().slice(0,10);
              const alreadyDoneToday = profile.lastStreakDate === todayStr;
              return (
                <div style={{ background: done ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${done ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, padding: "12px 16px", marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>🔥</span>
                      <div>
                        <div style={{ color: done ? "#fbbf24" : "#e2e8f0", fontWeight: 700, fontSize: 13 }}>
                          {streak > 0 ? `${streak} day streak` : "Start your streak"}
                        </div>
                        <div style={{ color: "#475569", fontSize: 10 }}>
                          {done ? "✓ Goal reached today!" : `Earn ${goal - todayXP} more XP today`}
                        </div>
                      </div>
                    </div>
                    <div style={{ color: done ? "#fbbf24" : "#475569", fontWeight: 800, fontSize: 13 }}>{todayXP}/{goal} XP</div>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: done ? "linear-gradient(90deg,#f59e0b,#fbbf24)" : "linear-gradient(90deg,#6366f1,#a78bfa)", borderRadius: 4, transition: "width 0.5s ease" }} />
                  </div>
                </div>
              );
            })()}

            <GameModePicker onStart={startGame} />
          </div>
        )}
        {tab === "learn"       && <LearnPage profile={profile} onGameComplete={(r) => { setPreviousTab("learn"); handleGameComplete(r); }} />}
        {tab === "profile"     && <ProfilePage profile={profile} onLogout={handleLogout} onReset={handleReset} onUpdateProfile={(p) => persistProfile(p)} />}
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  logo: {
    background: "linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#38bdf8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: 900,
    letterSpacing: -1,
  },
  sectionLabel: { color: "#334155", fontSize: 10, fontWeight: 800, letterSpacing: 2, marginBottom: 12, marginTop: 0 },
  gameWrap: {
    background: "#060a12", minHeight: "100vh", fontFamily: "system-ui, sans-serif",
    display: "flex", flexDirection: "column", maxWidth: 520, margin: "0 auto", padding: "0 16px",
  },
  backBtn: {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)",
    color: "#64748b", borderRadius: 10, padding: "6px 14px", cursor: "pointer", fontSize: 13,
  },
  stat: { color: "#a78bfa", fontWeight: 700, fontSize: 15 },
  question: { color: "#94a3b8", textAlign: "center", fontSize: 14, margin: 0 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" },
  option: {
    display: "flex", alignItems: "center", gap: 10, padding: "13px 14px",
    borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)", cursor: "pointer", fontSize: 13,
    textAlign: "left",
  },
  primaryBtn: {
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)", border: "none",
    color: "#fff", padding: "11px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer",
  },
  ghostBtn: {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#64748b", padding: "11px 20px", borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: "pointer",
  },
  input: {
    width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12, padding: "12px 16px", fontSize: 14, outline: "none", fontFamily: "system-ui",
  },
};