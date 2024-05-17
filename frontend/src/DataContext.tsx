import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Define the type for the data context
interface DataContextType {
  companyNames: { [key: number]: string };
}

// Create the context with default values
const DataContext = createContext<DataContextType>({
  companyNames: {},
});

// Custom hook to use the data context
export const useDataContext = () => useContext(DataContext);

// Define the type for the provider's props
interface DataContextProviderProps {
  children: React.ReactNode;
}

// Fetch company names
const fetchCompanyNames = async () => {
  try {
    const response = await fetch('http://localhost:8080/company/list');
    if (!response.ok) {
      throw new Error('Failed to fetch company names');
    }
    const data = await response.json();
    console.log('Fetched company data:', data); // Log fetched data

    // Assuming data is an array of objects with company_id and company_name properties
    return data.reduce((acc: { [key: number]: string }, company: { company_id: number; company_name: string }) => {
      acc[company.company_id] = company.company_name;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching company names:', error);
    return {};
  }
};

export const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }) => {
  const [companyNames, setCompanyNames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const loadCompanyNames = async () => {
      const names = await fetchCompanyNames();
      console.log('Company names after fetch:', names); // Log the processed names
      setCompanyNames(names);
    };
    loadCompanyNames();
  }, []);

  const value = useMemo(() => ({ companyNames }), [companyNames]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
