import os
import uuid

def generate_uuid_filename(user_id, filename):
  ext = os.path.splitext(filename)[1]
  gen_uuid = uuid.uuid4()
  return str(user_id) + '_' + gen_uuid.hex + ext