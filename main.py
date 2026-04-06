```python
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import utils

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run(server_class=HTTPServer, handler_class=CustomHandler, port=8080):
    server_address = ('0.0.0.0', port)
    httpd = server_class(server_address, handler_class)
    utils.print_server_info(port)
    httpd.serve_forever()

if __name__ == "__main__":
    run()
```

```python
# File: utils.py
import socket

def print_server_info(port):
    print(f"Server running at http://{get_local_ip()}:{port}/")

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP
```

```python
# File: test_main.py
import unittest
from unittest.mock import patch
from main import run, CustomHandler
import utils

class TestMain(unittest.TestCase):
    @patch('main.HTTPServer')
    def test_run(self, mock_server):
        run()
        mock_server.assert_called_once()

    @patch('utils.print_server_info')
    def test_print_server_info(self, mock_print):
        utils.print_server_info(8080)
        mock_print.assert_called_once_with(8080)

if __name__ == '__main__':
    unittest.main()
```

```python
# File: test_utils.py
import unittest
from unittest.mock import patch
import utils

class TestUtilities(unittest.TestCase):
    @patch('socket.socket')
    def test_get_local_ip(self, mock_socket):
        mock_instance = mock_socket.return_value
        mock_instance.getsockname.return_value = ('192.168.1.10', )
        self.assertEqual(utils.get_local_ip(), '192.168.1.10')

if __name__ == '__main__':
    unittest.main()
```