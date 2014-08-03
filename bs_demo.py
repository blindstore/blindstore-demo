"""
Python client libs for the blindstorm demo interface
"""

import datetime as dt
import requests
import json
from urllib.parse import urljoin


def _get_date():
    #return dt.datetime.now().isoformat()
    return dt.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]


class DemoClient(object):
    def __init__(self, server_addr):
        if not server_addr.startswith('http'):
            raise ValueError('server_addr should be an http server address'
                             ' starting with \'http[s]://\'')
        self.api_addr = urljoin(server_addr, 'rest/')

    def message(self, endpoint, title, message):
        data_dict = {
            'date': _get_date(),
            'title': title,
            'description': message,
        }
        #print(urljoin(self.api_addr, endpoint))
        r = requests.post(urljoin(self.api_addr, endpoint),
                          data=json.dumps(data_dict))


    def server_msg(self, title, message):
        return self.message('server-events', title, message)


    def client_msg(self, title, message):
        return self.message('client-events', title, message)

    def server_status(self, db):
        data_dict = {
            'date': _get_date(),
            'db': db,
        }
        r = requests.post(urljoin(self.api_addr, 'server-status'),
                          data=json.dumps(data_dict))

