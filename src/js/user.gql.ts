import _ from 'underscore'
import GQLRequest from './request-wrapper.gql'
import { validateURL } from './utils'
import config from './config'

class GQLUserQuery {
  private queryUrl : string

  private gqlClient : GQLRequest

  constructor() {
    this.queryUrl = config.serviceUrl + '/api'
    this.gqlClient = new GQLRequest({
      baseURL: this.queryUrl,
      method: 'POST',
      headers: {} 
    })
  }

  public async getLoggedInUser() : Promise<Maybe<AnyObject>> {
    const query = `
    query {
      getLoggedInUser {
        name,
        userTag,
        email,
        avatar,
        predefinedTimers
      }
    }
    `

    const response = await this.gqlClient.request(query)
    console.log('[GQL] getLoggedInUser\n', response)
    return response.getLoggedInUser
  }

  public async getPredefinedTimers() : Promise<AnyObject[]> {
    const query = `
    query {
      getPredefinedTimers
    }
    `
    const response = await this.gqlClient.request(query)
    console.log('[GQL] getPredefinedTimers\n', response)
    return response.getPredefinedTimers
  }

  public async updateLoggedInUser(args: QIUser) : Promise<User | null> {
    const query = `
    mutation updateLoggedInUserWithVars(
      $name: String
      $avatar: String
      $userTag: String
    ){
      updateLoggedInUser(
        args: {
          name: $name
          avatar: $avatar
          userTag: $userTag
        }
      ) {
        name,
        userTag,
        email,
        avatar,
        predefinedTimers
      }
    }
    `
    const response = await this.gqlClient.request(query, args)
    console.log('[GQL] updateLoggedInUser\n', response)
    return response.updateLoggedInUser
  }
}

export default new GQLUserQuery()
