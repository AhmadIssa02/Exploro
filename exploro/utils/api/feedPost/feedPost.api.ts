import { ApiParam } from '../client'
import CrudApi from '../crud/crud.api'
import { feedPost, feedPostRequest } from '../../../models/crud/feedPost.api'

export class FeedPostApi extends CrudApi<feedPost, feedPostRequest> {
  path = '/feedpost'
  constructor(param?: ApiParam) {
    super(param)
  }
}
