import { gql } from "apollo-server-express"
export const GETARTISAN_TEST=gql`
query{findAllArtisans {
    _id 
createdAt 
updatedAt 
email 
companyNumber 
type 
langue 
legalForm 
name 
street 
number 
cap 
city 
web 
telephone 
startDate 
endDate 
secteur 
}}
`