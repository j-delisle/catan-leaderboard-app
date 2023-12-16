import os
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_PROJECT_URL")
key: str = os.environ.get("PUBLIC_SUPABASE_KEY")
supabase_cli: Client = create_client(url, key)