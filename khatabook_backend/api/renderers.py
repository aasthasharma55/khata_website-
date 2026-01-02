from rest_framework import renderers
import json

class UserRenderer(renderers.JSONRenderer):
    """
    Custom renderer for user-related responses.
    It formats the response data to include a 'status' field.
    """
    charset = 'utf-8'
    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors': data})
        else:
            response = json.dumps(data)

        return response