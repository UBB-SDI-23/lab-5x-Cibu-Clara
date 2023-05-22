import os
import django
from django.utils import timezone
from django.conf import settings
from datetime import timedelta
from faker import Faker
django.setup()
from django.contrib.auth.models import User
from django.core.wsgi import get_wsgi_application

def replace_quotes(text):
    return text.replace("'", "`")


if __name__ == '__main__':
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Music_project.settings")
        django.setup()
        get_wsgi_application()

        fake = Faker()
        fake.add_provider(replace_quotes)
        existing_first_names = set()
        existing_last_names = set()
        batch_size = 1000
        with open('users.sql', 'w') as file:
                sql = """TRUNCATE TABLE "Music_app_userprofile" RESTART IDENTITY CASCADE;\n \
                INSERT INTO "Music_app_userprofile" (first_name, last_name, date_of_birth, location, bio, user_id, activation_code, activation_expiry_date, active) VALUES ('admin', 'admin', '2023-05-01', 'location', 'admin', 'admin', '0000', '2023-05-01', False); \n """
                file.write(sql + "\n")

                for i in range(0, 10000, 1000):
                        users = []
                        for j in range(i, i+1000):
                                if i % 100 == 0:
                                        print(f'{i*100} done')
                                first_name = replace_quotes(fake.first_name())
                                while first_name in existing_first_names:
                                        first_name = replace_quotes(fake.first_name())
                                existing_first_names.add(first_name)
                                last_name = replace_quotes(fake.last_name())
                                while last_name in existing_last_names:
                                        last_name = replace_quotes(fake.last_name())
                                existing_last_names.add(last_name)
                                date_of_birth = fake.date_of_birth().strftime('%Y-%m-%d')
                                location = replace_quotes(fake.city())
                                bio = replace_quotes(fake.text(max_nb_chars=200))
                                activation_code = fake.uuid4()
                                activation_expiry_date = str(timezone.now() + timedelta(minutes=10))
                                active = False
                                # Generate username and password
                                username = f"{first_name.lower()}{last_name.lower()}"
                                password = "Password123"
                                # Create user object
                                user = User.objects.create_user(username=username, password=password)
                                users.append(f"('{first_name}', '{last_name}', '{date_of_birth}', '{location}', '{bio}', '{username}', '{activation_code}', '{activation_expiry_date}', '{active}')")
                        data = f"""INSERT INTO "Music_app_userprofile" (first_name, last_name, date_of_birth, location, bio, user_id, activation_code, activation_expiry_date, active) VALUES {','.join(users)};"""
                        file.write(data + "\n")


                print("Users added")
                file.write("SELECT 'users done!' as msg;\n")
