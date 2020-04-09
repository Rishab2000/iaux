import { expect } from '@open-wc/testing';

import { SearchService } from '../lib/search-service';
import { SearchParams } from '../lib/search-params';

const generateMockResponse = (params) => {
  return {
    responseHeader: {
      status: 0,
      QTime: 1459,
      params: {
        query: params.query,
        qin: params.query,
        fields: params.fieldsAsString,
        wt: "json",
        sort: params.sort,
        rows: params.rows,
        start: params.start
      }
    },
    response: {
      numFound: 12345,
      start: 0,
      docs: [
        { identifier: "foo" },
        { identifier: "bar" },
      ]
    }
  }
}

describe('SearchService', () => {
  it('can search when requested', async () => {
    class MockSearchBackend {
      performSearch(params) {
        const mockResponse = generateMockResponse(params);
        return new Promise(resolve => resolve(mockResponse));
      }
    }

    const query = "title:foo AND collection:bar"
    const params = new SearchParams(query)
    const backend = new MockSearchBackend();
    const service = new SearchService(backend);
    const result = await service.search(params);
    expect(result.responseHeader.params.query).to.equal(query);
  });

  it('can request metadata when requested', async () => {
    class MockSearchBackend {
      fetchMetadata(identifier) {
        const mockResponse = { identifier };
        return new Promise(resolve => resolve(mockResponse));
      }
    }

    const backend = new MockSearchBackend();
    const service = new SearchService(backend);
    const result = await service.fetchMetadata('foo');
    expect(result.identifier).to.equal('foo');
  });
});