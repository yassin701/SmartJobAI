import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function JobFilter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [contractType, setContractType] = React.useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, contractType });
  };

  const handleContractChange = (e) => {
    const value = e.target.value;
    setContractType(value);
    onFilterChange({ searchTerm, contractType: value });
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-2/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by job title, company, or skills..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="relative w-full md:w-1/3">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaFilter className="text-gray-400" />
        </div>
        <select
          value={contractType}
          onChange={handleContractChange}
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none shadow-sm"
        >
          <option value="">All Categories (Contract)</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Stage">Stage</option>
          <option value="Alternance">Alternance</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
