export const fetchCurrentQueryParams = (searchParams) => {
    return new URLSearchParams(Object.entries(searchParams)).toString();
}
