import _ from 'underscore'
import { GraphQLClient, gql } from 'graphql-request'
import { validateURL } from './utils'
import config from './config'


class GQLShortlinkQuery {
  private queryUrl : string

  private gqlClient : GraphQLClient

  constructor() {
    this.queryUrl = config.serviceUrl + '/api'
    this.gqlClient = new GraphQLClient(this.queryUrl, { headers: {} })
  }

  public async createShortlink (location: string) : Promise<Maybe<AnyObject>> {
    if (validateURL(location) == false) {
      throw new Error(`Not a valid URL: '${location}'`)
    }
    const query = gql`
    mutation createShortlinkWithVars (
      $location: String!
    ){
      createShortlink(location: $location) {
        hash
        location
        descriptor {
          userTag
          descriptionTag
        }
      }
    }
    `

    const response = await this.gqlClient.request(query, { location })
    console.log('[GQL] createShortlink\n', response)
    return response.createShortlink
  }

  public async createShortlinkDescriptor (
    { userTag, descriptionTag, location, hash } : { userTag?: string, descriptionTag: string, location: string, hash?: string }
  ) : Promise<Maybe<AnyObject>> {
    if(!descriptionTag || !location) return null

    const query = gql`
    mutation createDescriptiveShortlinkWithVars(
      $userTag: String
      $descriptionTag: String!
      $location: String!
      $hash: String
    ) {
      createDescriptiveShortlink(
        userTag: $userTag, 
        descriptionTag: $descriptionTag, 
        location: $location, 
        hash: $hash
      ) {
        hash
        location
        descriptor {
          userTag
          descriptionTag
        }
      }
    }
    `

    const response = await this.gqlClient.request(query, { userTag, descriptionTag, location, hash })
    console.log('[GQL] createShortlinkDescriptor\n', response)
    return response.createDescriptiveShortlink
  }

  public async getUserShortlinks<T = AnyObject>( { limit, skip, sort, order, search } : QICommon) : Promise<T[]> {
    const query = gql`
    query getUserShortlinksWithVars (
      $limit: Int
      $skip: Int
      $sort: String
      $order: String
      $search: String
    ){
      getUserShortlinks(
        args: {
          limit: $limit
          skip: $skip
          sort: $sort
          order: $order
          search: $search
        }
      ) {
        hash
        location
        descriptor {
          userTag
          descriptionTag
        }
        owner
        urlMetadata
        snooze {
          awake
          description
        }
        createdAt
        updatedAt
        siteTitle
        siteDescription
      }
    }
    `

    const response = await this.gqlClient.request(query, { limit, skip, sort, order, search })
    console.log('[GQL] getUserShortlinks\n', response)
    return response.getUserShortlinks
  }
}

export default new GQLShortlinkQuery()