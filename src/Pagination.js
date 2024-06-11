import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    background: #6633cc;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #5522aa;
    }

    &:disabled {
        background: #cccccc;
        cursor: not-allowed;
    }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <PaginationWrapper>
            <PaginationButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </PaginationButton>
            <PaginationButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </PaginationButton>
        </PaginationWrapper>
    );
};

export default Pagination;