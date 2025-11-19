from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class ChatHistory(models.Model):
    id = models.CharField(primary_key=True)
    user_email = models.CharField(max_length=255)
    file_key = models.CharField(max_length=512)
    response = models.TextField()
    timestamp = models.DateTimeField()
    def __str__(self):
        return f"ChatHistory {self.id} for {self.user_email}"
    class Meta:
        db_table = "chathistory"
        managed = False 